<template>
  <div :class="'main'">

    <table class="table">
      <thead class="tr">
      <th class="th" >Ответ</th>
      <th class="th">Вопрос</th>
      </thead>
      <tbody  class="tbody">
      <tr v-for="item in this.nameUser" v-bind:key="item.id" class="tr">
        <template v-if="item.typeMessage == 'ANSWER'">
          <td :class="'tda'"><small><small>{{ item.datewrite.substring(0,16).replace('T', ' ' ) }} {{item.users.name}}</small></small> <br> <div> {{ item.text }} </div> </td>
          <td :class="'tdblank'"></td>
        </template>
        <template v-else>
          <td :class="'tdblank'"></td>
          <td  :class="'td'"><small><small>{{ item.datewrite.substring(0,16).replace('T', ' ' ) }} {{item.users.name}}</small></small> <br> {{ item.text }}</td>
        </template>
      </tr>
      </tbody>
    </table>

    <br>
    <form v-on:submit="addProduct" >
      <input class="input" type="text" v-model="messagedto.text" placeholder="Сообщение" >
      <button type="submit" class="buttonsend">Отправить</button>
    </form>

  </div>





</template>

<script src="./app.ts"></script>
<style src="./app.css"></style>
