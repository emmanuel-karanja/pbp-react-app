import React, {Component} from 'react';
import axios from 'axios';
import {DropDownList} from 'react-widgets';


const ListItem=({item})=>(
   <span>
      <strong>{item.firstname}</strong>
      {" "+item.lastname}
   </span>
)
export default class CandidateDropDownList extends Component{
 constructor(props){
     super(props);
    this.state={
       currentSelectedId:null,
       candidates:[],
       error:null,
       hasError:false,
    }
    //bindings
    this.handleSelection=this.handleSelection.bind(this);
 }

 componentDidMount(){
   axios.get('http://localhost:5000/candidates')
         .then(response=>{
             this.setState({candidates:response.data,hasError:false});
         }).catch(error=>{
             this.setState({error:error.data, hasError:true});
             console.log(error);
         });
 }

 handleSelection(selectedOption){
    this.setState({currentSelectedId: selectedOption});
 }

 render(){
     const {candidates,currentSelectedId,hasError}=this.state;
     return(
         <div>
           {candidates && !hasError && 
             <DropDownList
                data={candidates}
                textField='name'
                valueField='id'
                itemComponent={ListItem}
                onChange={this.handleSelection}
             />
            }
            <br/>
            {currentSelectedId === null? null : 
               <div>
                 Selected : {currentSelectedId}
               </div>
            }
         </div>
     );
 }
	
}