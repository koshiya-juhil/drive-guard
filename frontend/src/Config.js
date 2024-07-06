class _Config {
    constructor(){
        this.webname = 'Metomic';
        this.servermode = import.meta.env.VITE_SERVER_MODE;

        if(this.servermode === 'dev'){
            this.serverurl = import.meta.env.VITE_DEV_SERVER_URL;
            this.weburl = import.meta.env.VITE_DEV_URL;
        }
        else if(this.servermode === 'prod'){
            this.serverurl = import.meta.env.VITE_PROD_SERVER_URL;
            this.weburl = import.meta.env.VITE_PROD_URL;
        }
    }

    get webName(){
        return this.webname;
    }

    get serverUrl(){
        return this.serverurl;
    }

    get webUrl(){
        return this.weburl;
    }
}

const Config = new _Config();

export default Config;