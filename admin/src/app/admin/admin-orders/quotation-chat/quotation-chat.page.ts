import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-quotation-chat',
  templateUrl: './quotation-chat.page.html',
  styleUrls: ['./quotation-chat.page.scss'],
})
export class QuotationChatPage implements OnInit {
  order;
  msgs;
  disableSendBtn: boolean = true;
  adminMsgText: string = '';
  maxMessageWidth = 200
  constructor(private modalController: ModalController,
              private orderService: OrderService) { }

  async ngOnInit() {
    const msgs = await this.orderService.getOrderMessages(this.order.id);
    if(msgs){
      this.msgs = msgs;
    }
    this.orderService.orderMsgs.subscribe(msgs=>{
      this.msgs = msgs;
    })
    console.log('msgs:', msgs);
  }

  closeModal() {
    this.modalController.dismiss();
  }

  messageModifications(msg) {
    msg = msg.trim();
    const exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    const text1 = msg.replace(exp, '<a href=\'$1\'>$1</a>');
    const exp2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    const finalText = text1.replace(exp2, '$1<a target="_blank" href="http://$2">$2</a>');
    return finalText;
  }
  
  changeInMsgInput() {
    this.disableSendBtn = false;
  }

  async sendMessage() {
    if(this.adminMsgText !== '') {
    // this.enableScroll = false;
    // this.showMsgLoader = true;
    const msg = {
      createdAt: new Date(),
      author: 'admin',
      msg: this.adminMsgText,
      userId: this.order.userId
    }
    //this.allMsgs.push({msgData: msg});
    const success = await this.orderService.addOrderMessages(this.order.id, msg);
    if (success) {
      this.adminMsgText = '';
      var objDiv = document.getElementById("scroll2");
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }
}

preventFocusChange(e) {
  e.preventDefault();
}

  
ionViewWillLeave() {
  this.orderService.orderMsgsSub.unsubscribe();
}

}
