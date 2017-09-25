<template>
  <div id="dd">
    <div class="demo-controls">
      <input class="demo-input" id="search" ref="search" aria-label="Click copy"
      @keyup="find"
      @keyup.enter="execute"
      v-model="problemHint"
      v-focus
      placeholder="what problem you want to solve?."></input>

    </div>
    <div class="matching-problems" v-for="problem in matchingProblems">
      <div>{{problem.problemStatement.title}}</div>
    </div>
  
    <div class="system-info">
      {{executionInfo}}
  	<mazolution ref="mazolution"></mazolution>
    </div>
  </div>
</template>

<script>


const {remote} = require("electron");
const ipc = require('electron').ipcRenderer;
const _= require("underscore");
const log = require("./log")

import mazolution from './mazolution';

 const focus = {
    inserted(el) {
      el.focus()
    },
  }

export default {
  data(){
    return{
      problemHint: "",
      matchingProblems:[],
      selectedSolution:null,
      executionInfo:null
    }
  },
  components:{
  	'mazolution':mazolution},

  directives: { focus },
  methods:{
    find(){ 
      this.matchingProblems = this.$refs.mazolution.find(this.problemHint);
      if(this.matchingProblems
        && this.matchingProblems.length > 0
        && this.matchingProblems[0].solutions
        && this.matchingProblems[0].solutions.length > 0)
        this.selectedSolution =  this.matchingProblems[0].solutions[0];
      },
      execute(){
        if(this.selectedSolution)
        {
          remote.BrowserWindow.getFocusedWindow().hide();


          var result = null;
          //todo: check environment first
          _.each(this.selectedSolution.steps,function(step,index){
            log.info(`Evaluation Step ${index} started`); 
            eval(step.automation);
            this.executionInfo = result;
            log.info(`Evaluation Step ${index} execute successfully, result is ${result}`); 
          },this);
        }
      } 
    }
  }
  </script>
