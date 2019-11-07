import SoapAPI from './SoapAPI'

class EnterpiseService{
    constructor(){
        this.soapAPI = new SoapAPI('xmlns:us="http://enterprise-yutsyk.lab3"','us','http://localhost:3000/soapWS');
    }
    getData(node){
        if(node!=null){
           return node.innerHTML;
        }
        return null;
    }

    updateByName(name,enterprise,old,context){
        const {url,params} = this.soapAPI.formQuery("updateEnterpriseRequest",{name:name,enterprise:enterprise});
        fetch(url,params)
            .then(response=>response.text())
                .then(text=>{
                    let parser = new DOMParser();
                    let xmlDoc = parser.parseFromString(text.toString(),"text/xml");
                    return xmlDoc;
                }).
                    then(xml=>{
                        const name =  xml.getElementsByTagName("ns2:name")[0];
                        const activity = xml.getElementsByTagName("ns2:type_of_activity")[0];
                        const ceo = xml.getElementsByTagName("ns2:ceo")[0];
                        const founder = xml.getElementsByName("ns2:founder")[0];
                        const founded = xml.getElementsByTagName("ns2:founded")[0];
                        const staff = xml.getElementsByTagName("ns2:staff")[0];
                        const enterprises = context().state.enterprises
                        const enterprise = {name:name};
                        enterprise.activity = activity;
                        enterprise.ceo = ceo;
                        enterprise.founded = founded;
                        enterprise.founder = founder;
                        enterprise.staff = staff;
                    //    enterprises.push(enterprise);
                        
                        for(let i in enterprises){
                            if(enterprises[i].name == old.name
                                && enterprises[i].ceo == old.ceo){
                            
                                  enterprises[i] = enterprise;
                            }
                        } 
                    
                        context().setState({enterprises:enterprises,isLoading:false });
                        
                    });
    }
    deleteByName(name,context){
        const {url,params} = this.soapAPI.formQuery("updateEnterpriseRequest",{name:name});
        fetch(url,params)
            .then(response=>response.text())
                .then(text=>{
                    let parser = new DOMParser();
                    let xmlDoc = parser.parseFromString(text.toString(),"text/xml");
                    return xmlDoc;
                }).
                    then(xml=>{
                        const name =  xml.getElementsByTagName("ns2:name")[0];
                        const activity = xml.getElementsByTagName("ns2:type_of_activity")[0];
                        const ceo = xml.getElementsByTagName("ns2:ceo")[0];
                        const founder = xml.getElementsByName("ns2:founder")[0];
                        const founded = xml.getElementsByTagName("ns2:founded")[0];
                        const staff = xml.getElementsByTagName("ns2:staff")[0];
                        const enterprises = context().state.enterprises;
                        const enterprise = {name:name};
                        enterprise.activity = activity;
                        enterprise.ceo = ceo;
                        enterprise.founded = founded;
                        enterprise.founder = founder;
                        enterprise.staff = staff;
                       
                        for(let i in enterprises){
                            if(enterprises[i].name == enterprise.name
                                && enterprises[i].ceo == enterprise.ceo){
                                  enterprises.splice(i,1);
                            }
                        } 
                        context().setState({enterprises:enterprises,isLoading:false });
                    });
    }
    create(enterprise,context){
        const {url,params} = this.soapAPI.formQuery("createEnterpriseRequest",{enterprise:enterprise});
        fetch(url,params)
            .then(response=>response.text())
                .then(text=>{
                    let parser = new DOMParser();
                    let xmlDoc = parser.parseFromString(text.toString(),"text/xml");
                    return xmlDoc;
                }).
                    then(xml=>{
                        const name =  xml.getElementsByTagName("ns2:name")[0];
                        const activity = xml.getElementsByTagName("ns2:type_of_activity")[0];
                        const ceo = xml.getElementsByTagName("ns2:ceo")[0];
                        const founder = xml.getElementsByName("ns2:founder")[0];
                        const founded = xml.getElementsByTagName("ns2:founded")[0];
                        const staff = xml.getElementsByTagName("ns2:staff")[0];
                        const enterprises = context().state.enterprises
                        const enterprise = {name:name};
                        enterprise.activity = activity;
                        enterprise.ceo = ceo;
                        enterprise.founded = founded;
                        enterprise.founder = founder;
                        enterprise.staff = staff;
                        enterprises.push(enterprise);
                        context().setState({enterprises:enterprises,isLoading:false});

                    });
    }
  
    loadPage(pageOptions,context){

        const {url,params}  = this.soapAPI.formQuery("getEnterprisesRequest",{
            page:pageOptions.page,
            page_size:pageOptions.pageSize
        });   
        fetch(url,params).
            then(response=>response.text())
                .then(text=>{
                    let parser = new DOMParser();
                    let xmlDoc = parser.parseFromString(text.toString(),"text/xml");
                    return xmlDoc}).
                    then(xml=>{
                       const enterprises = []
                       const names =  xml.getElementsByTagName("ns2:name");
                       const activitys = xml.getElementsByTagName("ns2:type_of_activity");
                       const ceos = xml.getElementsByTagName("ns2:ceo");
                       const founders = xml.getElementsByName("ns2:founder");
                       const foundeds = xml.getElementsByTagName("ns2:founded");
                       const staffs = xml.getElementsByTagName("ns2:staff");
                       for(let i=0;i<names.length;i++){
                           enterprises.push({
                             name:this.getData(names[i]),
                             activity:this.getData(activitys[i]),
                             ceo:this.getData(ceos[i]),
                             founded:this.getData(foundeds[i]),
                             founder:this.getData(founders[i]),
                             staff:this.getData(staffs[i])
                           });
                       }
                       
                       context().setState({
                           enterprises:enterprises,
                           isLoading:false 
                        });
                    });
    }
}

export default EnterpiseService;