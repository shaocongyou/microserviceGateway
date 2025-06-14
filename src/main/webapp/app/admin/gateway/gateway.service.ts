import axios from 'axios';

export default class GatewayService {
  findAll(): Promise<any> {
    return new Promise(resolve => {
      axios.get('api/gateway/routes').then(res => {
        resolve(res);
      });
    });
  }
}
