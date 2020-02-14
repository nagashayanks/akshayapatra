import { Injectable } from '@angular/core';
@Injectable()
export class UrlConfig {
    serverConfig = true;
    // 'http://10.117.189.177:9090/housepital/
    private apiHost = 'http://10.117.189.177:9090/akshayapathra/';
    private apiMock = 'http://localhost:3000/';
    url = {};

    /* url config with url Mock list */
    urlMock() {
        return this.url = {
            userLogin: 'http://10.117.189.111:9090/akshayapathra/' + 'doctors',
            doctorHistory: this.apiMock + 'doctorList',
            schemes:  this.apiMock + 'schemes',
        };
    }
    /* url config with url Server list */
    urlApi() {
        return this.url = {
            userLogin: this.apiHost + 'doctors',
            schemes:  this.apiHost + 'schemes',
        };
    }
    /* return url */
    urlConfig() {
        return this.serverConfig ? this.urlApi() : this.urlMock();
    }
}
