import React ,{Component} from 'react';
import PropTypes from 'prop-types';
import PdfViewer from './PdfViewer';
import AddCommentForm from './AddCommentForm';
import axios from 'axios';


//this is a container for the PdfViewer and the AddCommentForm
export default class ResumeViewer extends Component{
    constructor(props){
        super(props);
        this.state={
            hasError:false,
            error:""
        }
    }
    addComment=(comment)=>{
        const {candidate}=this.props;
        let newComment={...comment, resumeId:candidate.resumeId};
       axios.post('http://localhost:5000/comments',newComment)
            .then(res=>{
                //comment added successfully
                this.setState({hasError:false})
                alert(`Comment added to resume of ${candidate.firstname+' '+candidate.lastname}`)
            }).catch(error=>{
                console.log(error);
                this.setState({hasError:true,error:error.message});
            });
    }

    render(){
        const {candidate}=this.props;
        const {hasError,error}=this.state;
        //construct the URL, this is a hack for the purposes of this simple demo
        const resumeUrl=`http://localhost/sample_resumes/resume${candidate.resumeId}.pdf`;
        return(
            <div>
                {hasError && <div>Could not addd comment error occurred: {error}</div>}
                {candidate && <div>
                    <h2>Resume for <strong>{candidate.firstname+' '+candidate.lastname}</strong></h2>
                    <PdfViewer documentUrl={resumeUrl}/>
                    <AddCommentForm createComment={this.addComment}/>
                    </div>
                }
            </div>
        );
    }
}

ResumeViewer.propTypes={
    candidate:PropTypes.object.isRequired,
}