class SoapAPI{
  
    constructor(ns,nsTag,url){
        this.headers = new Headers();
        this.headers.append('Content-Type', 'text/xml');
        this.params = {
            method: 'POST',
            headers: this.headers,
            mode: 'cors',
            cache: 'no-cache',
            body:null
        };
        this.nsTag = nsTag;
        this.namescape = ns;
        this.url = url;

    }
    formQuery(method,data){
        let msgHeader = '<soapenv:Header/>'
        let msgBody = this.formBody(method,this.nsTag,data);
        let msg = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
        ${this.namescape}>${msgHeader}${msgBody}</soapenv:Envelope>`
        this.params.headers.append('Content-Length', msg.length.toString());
        this.params.body = msg;
        console.log(msg);
        return {url:this.url,params:this.params};
    }
    formBody(method,nsTag,data)
    {
        let body = `<soapenv:Body>
                  <${nsTag}:${method}>`
        let openTagStack=[];
        for(let el in data){
            if(data[el] != null){
                body += `<${nsTag}:${el}>${data[el]}</${nsTag}:${el}>`;
            }
            else{
                let obj =`<${nsTag}:${el}>`;
                body+=obj;
                openTagStack.push(obj);
            }

        }
        while(openTagStack.length>0){
            let tag = openTagStack[openTagStack.length-1];
            let closeTag = tag.slice(0,1) + '/'+ tag.slice(1);
            body+=closeTag;
            openTagStack.pop();
        }
        body+=`</us:${method}>
        </soapenv:Body>`;
        return body;

    }
}

export default SoapAPI;