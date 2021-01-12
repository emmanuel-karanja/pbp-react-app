import React ,{Component} from 'react';

//uses a service worker to allow the document to be loaded in a separate
//thread to prevent the screen from freezing as the document loads for better UX
import { Document, Page } from "react-pdf/dist/entry.webpack";
import PropTypes from 'prop-types';
import "react-pdf/dist/Page/AnnotationLayer.css";


//this component renders the pdf format CV/resume
//it has two nav-style button because most CVs will often be more than one
//page. The buttons allows easy navigation from page to page

export default class ResumeViewer extends Component{
   constructor(props){
   super(props);
   this.state={numPages:null, pageNumber:1}; 
 }

  onDocumentLoadSuccess=({numPages})=>{
     this.setState({numPages});
   }

  toPrevPage=()=>{
     this.setState(state=>({pageNumber: this.state.pageNumber-1}));
  }
  toNextPage=()=>{
    this.setState(state=>({pageNumber:this.state.pageNumber+1}));
  }

  render(){
   const {numPages,pageNumber}=this.state;
   //resume is a required prop string that will be a url string to the document.
   //it'll most likely be fetched from an S3 bucket in a production implementation
   const {resumeUrl}=this.props;

   return(
    <div>
     <nav>
       <button onClick={this.toPrevPage}>Prev></button>
       <button onClick={this.toNextPage}>Next></button>
     </nav>
      <div style={{width: 500}}>
         <Document
           file={resumeUrl}
           onLoadSuccess={this.onDocumentLoadSucess}>
          <Page pageNumber={pageNumber} width={500}/>
         </Document>
      </div> 
      <p>
          Page {pageNumber} of {numPages}
      </p>
    </div>
   );
  }
}

//prop types for prop validation
ResumeViewer.propTypes={
    resumeUrl: PropTypes.string.isRequired,
 }