class UpdateService{
    enterprise = {
        name:"",
        ceo:"",
        staff:0,
        founded:"",
        founder:""
    }
    constructor(){
        
    }
    openUpdateWindow(tableContext){
        const {context,node} = tableContext;
        const row =  node.parentNode.parentElement;
        let enterprise = this.enterprise;
        console.log(row);
        for (let i in row.childNodes) {
            let tag =" "+ row.childNodes[i].className;
            tag = tag.replace("cell ","").trim();
            
            console.log(tag);
            switch(tag){
            
                case "name":
                    enterprise.name = row.childNodes[i].innerText;
                    console.log("name founded");
                    console.log( enterprise.name )
                    break;
                case "ceo":
                    enterprise.ceo = row.childNodes[i].innerText;
                    break;
                case "activity":
                    enterprise.activity = row.childNodes[i].innerText;
                    break;
                case "founder":
                    enterprise.founder = row.childNodes[i].innerText;
                    break;
                case "founded":
                    enterprise.founded = row.childNodes[i].innerText;
                    break;
                case "staff":   
                    enterprise.founded = row.childNodes[i].innerText;
                    break;
                 
            }
        }
      
     
       // context.nameRef.input.value = enterprise.name;
        context.setState({showModal:true});
        console.log(enterprise);
        console.log(context.nameRef);
        

        return enterprise;

    }
    update(tableContext,data,updateFunc){
        const {context,node} = tableContext;
        

    }
}
export default UpdateService;
