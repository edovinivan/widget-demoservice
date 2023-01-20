<template>
  <div :class="'main'">

    <table class="table">
      <thead style="width: 100%; display: flex">
      <th class="th" >Ответ</th>
      <th class="th">Вопрос</th>
      </thead>
      <tbody  style="width: 100%">
      <tr v-for="item in this.nameUser" v-bind:key="item.id" class="item" >
        <template v-if="item.typeMessage == 'ANSWER'">
          <td :class="'td'"><small><small>{{ item.datewrite.substring(0,16) }}</small></small> <br> <div> {{ item.text }} </div> </td>
          <td :class="'tdblank'"></td>
        </template>
        <template v-else>
          <td :class="'tdblank'"></td>
          <td  :class="'td'"><small><small>{{ item.datewrite.substring(0,16) }}</small></small> <br> {{ item.text }}</td>
        </template>
      </tr>
      </tbody>
    </table>

    <br>
    <form v-on:submit="addProduct" >
      <input class="input" type="text" v-model="messagedto.text" placeholder="Сообщение" >
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button type="submit">Отправить</button>
    </form>

  </div>





</template>

<script src="./app.ts"></script>
<style src="./app.css"></style>
