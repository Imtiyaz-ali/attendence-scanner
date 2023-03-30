import { Component } from '@angular/core';
import Web3 from 'web3';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  switchMode() {
    var modeSwitch = document.querySelector('.mode-switch');
    document.documentElement.classList.toggle('light');
    modeSwitch!.classList.toggle('active');

  }

  // web3 variables
  user_add: any;

  async connectWallet() {
    if (window.ethereum) {
      try {
        await window.ethereum.enable();
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        console.log('Connected with address:', accounts[0]);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error('Install MetaMask or other web3 wallet');
    }
  }

  // mobile nav
  mobileNav(){
    document.querySelectorAll(".fab").forEach((fab) =>
	fab.addEventListener("click", (ev) => {
		ev.stopPropagation();
		fab.classList.toggle("open");
	})
);
  }

}
