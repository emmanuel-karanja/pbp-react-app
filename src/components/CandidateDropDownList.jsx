import React, {Component} from 'react';
import axios from 'axios';
import Select from 'react-select'
import ResumeViewer from './ResumeViewer';




export default class CandidateDropDownList extends Component{
 constructor(){
     super();
    this.state={
       currentSelectedId:null,
       candidates:[],
       error:null,
       hasError:false,
       currentCandidate:null
    }
    
    console.log('candidate drop down');
 }

 componentDidMount(){
   //fetch candidates from API(in future, url root is stored in .env)
   //fetch and update state
   axios.get('http://localhost:5000/candidates')
         .then(response=>{
             this.setState({candidates:response.data,hasError:false});
             console.log(response);
         }).catch(error=>{
             this.setState({error:error.data, hasError:true});
             console.log(error);
         });
 }

 handleSelection=(selectedOption)=>{
    this.setState({currentSelectedId: selectedOption.value});
    let candidate=this.state.candidates.find(c=>c.id===selectedOption.value);
    this.setState({currentCandidate: candidate});
    console.log(`current candidate ${candidate}`);
 }

 render(){
     //destructure
     const {candidates,currentSelectedId,hasError,currentCandidate}=this.state;

     //create an options key-value pairs array to be used with the
     //select component.
     const options=candidates.map(c=>{ return{value:c.id,label: c.firstname+' '+c.lastname}});
     return(
         <div className="container">
          {options && !hasError && <div style={{width:300}}>
            Candidate:
            <Select options={options}
             onChange={this.handleSelection}
             defaultValue={{label: "--Select A Candidate--"}}
             />
          </div>
          }
            <br/>
            {currentSelectedId === null? null : 
               <div>
                {currentCandidate.resumeId?
                   <ResumeViewer candidate={currentCandidate}/>
                    :
                   <p>The Selected Candidate {currentCandidate.firstname+' '+currentCandidate.lastname} does NOT have a resume uploaded</p>       
                }
               </div>
            }
         </div>
     );
 }
	
}