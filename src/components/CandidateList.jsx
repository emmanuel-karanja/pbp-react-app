import React,{Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const CandidateRow=({candidate})=>{
   return(
       <tr>
           <td>{candidate.id}</td>
           <td>{candidate.firstname}</td>
           <td>{candidate.lastnname}</td>
           <td>{candidate.email}</td>
           <td>{candidate.resumeId ? <strong>Yes</strong> : <strong>No</strong>} </td>
       </tr>
   );
}

CandidateRow.propType={
    candidate:PropTypes.object.isRequired,
}
const CandidateTable=({candidates})=>{
    var elements=[];
    if(Array.isArray(candidates)){
        elements= candidates.map(c=><CandidateRow candidate={c}/>)
    }
    return(
        <table>
            <th>Candidate Id</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Email</th>
            <th>Has Resume</th>
            {elements.length>0 ?{elements} : <div className="alert alert-danger"> 
               There are no candidates to display</div>}
        </table>
    );
}

CandidateTable.propTypes={
    candidates:PropTypes.array.isRequired,
}

export default class CanidateList extends Component{
    constructor(){
        super();
        this.state={candidates:[],
                   hasError:false,
                errro:""}
    }

    componentDidMount(){
        axios.get('http://localhost:5000/candidates')
              .then(res=>{
                  this.setState({candidates:res.data,hasError:false});
              }).catch(error=>{
                  this.setState({hasError:true,error:error.message});
                  console.log(error);
              });
    }

    render(){
        const{error,hasError,candidates}=this.state;
        return(
            <div>
                {hasError && <div className="alert alert-danger" role="alert">
                    Could not load candidates, an error occurred {error}</div>
                }
                {candidates && <CandidateTable canddiates={candidates}/>}
            </div>
        );
    }
}