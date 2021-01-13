import React, {Component} from 'react';
import axios from 'axios';
import Select from 'react-select'
import ResumeViewer from './ResumeViewer';




export default class PbpApp extends Component{
 constructor(){
     super();
    this.state={
       currentSelectedId:null,
       candidates:[],
       error:"",
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
             this.setState({error:error.message, hasError:true});
             console.log(error);
         });
 }

 handleSelection=(selectedOption)=>{
    this.setState({currentSelectedId: selectedOption.value});
    let candidate=this.state.candidates.find(c=>c.id===selectedOption.value);
    this.setState({currentCandidate: candidate});
 }

 render(){
     //destructure
     const {candidates,currentSelectedId,hasError,currentCandidate,error}=this.state;

     //create an options key-value pairs array to be used with the
     //select component.
     const options=candidates.map(c=>{ return{value:c.id,label: c.firstname+' '+c.lastname}});
     return(
         <div className="container justify-content-center">
            <div className ="dark"><h1>Pbp React Tech-Assessment App</h1></div>

         {hasError && <div className="alert alert-danger" role="alert">
                         Could not load candidates error: {error}
                      </div>}
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
                    <div className="alert alert-info" role="alert">
                      The Selected Candidate {currentCandidate.firstname+' '+currentCandidate.lastname} does NOT have a resume uploaded
                    </div>    
                }
               </div>
            }
         </div>
     );
 }
	
}