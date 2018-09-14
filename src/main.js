
import './assets/style/wing'
import './assets/style/index.less';
import * as u from './assets/utils';


const $app = u.e('#app');


$app.innerHTML = `
  <h1>Reborn</h1>
  <div class="cards">
    <div class="card">
      <h5 class="card-header">Header</h5>
      <p class="card-body">Content</p>
      <div class="card-footer center text-center"><p>Footer</p></div>
    </div>
  </div>
  
`
