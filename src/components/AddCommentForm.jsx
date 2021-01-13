import React, {Component} from 'react';
import PropTypes from 'prop-types';

//a very simple form for adding comments to Resumes, but applicable elsewhere
//for a more advanced form, formik and yup would be used for validation and handling
//form local state

export default class AddCommentForm extends Component{
  constructor(props){
    super(props);
    //ephemeral local state required by the form
    this.state={
     content:'',
     valid:true
    }
  }
  onContentChange=e=>{
    this.setState({content: e.target.value});
  }

  resetForm=()=>{
     this.setState({content:'',valid:true});
  }

  onCreateComment=e=>{
      //prevent default submit behavior
      e.preventDefault();
      //use the prop function to make the call, let the container component handle the API call
      if(this.state.content ===""){
        this.setState({valid:false});
        return;
      }
      this.props.createComment({
        content:this.state.content,
        date: new Date()
      });
    this.resetForm();
   }
   render(){
      const {content,valid}=this.state;
      
      return(       
        <div>
         <form onSubmit={this.onCreateComment}>
         {!valid && <div className={valid?"":"alert alert-danger"}>
             You cannot post an empty comment
             </div>
          }
        <div className="row">
         <div className="col-sm-4">
          <input style={{padding:'0.2em'}}
            onChange={this.onContentChange}
            value={content}
            type="text"
            placeholder="...write a comment" 
            className={valid?"card border-info":"border-danger"}
          />
          </div>
           <div className="col-sm-2"><button className="btn btn-primary btn-sm" type="submit" style={{padding:"0.3em"}}>
               + Add
             </button>
            </div>
          </div>
          <br/>
         </form>  
        </div> 
      );
   }
   
}

///the mandatory createComment prop function
AddCommentForm.propTypes={
  createComment:PropTypes.func.isRequired,
}