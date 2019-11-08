import React,{Component} from 'react';
import EnterpriseService from './EnterpriseService';
import UploadService from './updateService';
import ReactModal from 'react-modal';
import Input from '@material-ui/core/Input'; 
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
class EnterpriseTable extends Component{
    state = {
        isLoading: true,
        enterprises: [],
        form:null,
        isFormLoading:true,
        page:0,
        pageSize:5,
        showModal: false,
        updateEnterprise:{name:'',ceo:'',activity:'',staff:'',founded:'',founder:''},
        activityTypes:[{value:'IT',label:'IT'},
            {value:'Машинобудування',label:'Машинобудування'},
            {value:'Продаж авто',label:'Продаж авто'},
            {value:'Легка промисловість',label:'Легка промисловість'},
            {value:'GameDev',label:'GameDev'},
            {value:'Продаж продуктів',label:'Продаж продуктів'},

        ],
        error: null
    };
   
    handleOpenModal () {
        this.setState({ showModal: true });
      }
      
      handleCloseModal () {
        this.setState({ showModal: false });
    }
    service = new EnterpriseService();
    updateService = new UploadService();
    getData(node){
        if(node!=null){
           return node.innerHTML;
        }
        return null;
    }
    getTableContext(){
        return this;
    }
    getEventContext(event){
        this.handleOpenModal();
        return {context:this,node:event.target}
    }
    constructor(props){
        super(props);
        this.getTableContext = this.getTableContext.bind(this);
        this.getEventContext = this.getEventContext.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.nameRef = React.createRef();
        this.activityRef = React.createRef();
        this.ceoRef = React.createRef();
        this.founderRef = React.createRef();
        this.foundedRef = React.createRef();
        this.staffRef = React.createRef();
     
 
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.service.loadPage({page:0,pageSize:5},this.getTableContext);        
    }
    

    render(){
        const { isLoading, enterprises, error } = this.state;
        return (
        <div id="table-container">
            <div className = 'table'>
               {!isLoading ? (
        enterprises.map(enterprise => {
          const { name,ceo,founded,founder,activity,staff} = enterprise;
          return (
            <div key={enterprise+name} className="row">
                <div className="cell name">{name}</div>
                <div className="cell ceo">{ceo}</div>
                <div className="cell founder">{founder}</div>
                <div className="cell found">{staff}</div>
                <div className="cell activity">{activity}</div>
                <div className="cell founded">{founded}</div>
                <div className="cell actions">
                    <div onClick={(event)=>{
                      let res = this.getEventContext(event);
                      console.log(res);
                    }}>ok</div>
                    <a href="#" onClick={(event)=>{
                            this.updateService.openUpdateWindow(this.getEventContext(event))
                        }
                    }>update</a>
                    <a href="#">delete</a>
                </div>
            </div>
                );
                })
      // If there is a delay in data, let's let the user know it's loading
                ) :(
                <h3>Loading...</h3>
                )}
                
            </div>
            <div className="pagination"></div>
            <ReactModal   
                isOpen={this.state.showModal}
                shouldCloseOnOverlayClick={true}
                shouldCloseOnEsc={true}>
                    <Input
                        placeholder="Назва підприємства"
                         inputProps={{
                           'aria-label': 'description',
                         } } 
                         id="name-e" ref = {this.nameRef} defaultValue={this.state.updateEnterprise.name} />
                    <Input placeholder="ФІО зісновника" id='founder-e' 
                     disabled
                    ref ={this.founderRef}
                        defaultValue={this.state.updateEnterprise.founder}
                    />
                    <Input placeholder="ФІО керівника" id="ceo-e" 
                            defaultValue = {this.state.updateEnterprise.ceo}/>
                     <TextField select placeholder="діяльність" id="activity-e" 
                           />        
                    <Input placeholder="штат співробітників" id="staff-e"
                            defaultValue={this.state.updateEnterprise.staff}/>
                    <Button onClick={this.handleCloseModal}>
                        update
                    </Button>
            </ReactModal>
        </div>)
    }
}

export default EnterpriseTable;