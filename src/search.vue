<template>
<div id="dd">
  <div class="demo-controls">
      <input class="demo-input" id="copy-to-input" aria-label="Click copy"
      @keyup="find"
      @keyup.enter="execute"
      v-model="problemHint"
      placeholder="what problem you want to solve?."></input>

    </div>
    <div class="matching-problems" v-for="problem in matchingProblems">
      <div>{{problem.problemStatement.title}}</div>
    </div>
    <div class="system-info">
      We are using node <script>document.write(process.versions.node)</script>,
      Chrome <script>document.write(process.versions.chrome)</script>,
      and Electron <script>document.write(process.versions.electron)</script>.
    </div>
    <div class="system-info">
      {{executionInfo}}
    </div>
  </div>
</template>

<script>

const {remote} = require("electron");
const ipc = require('electron').ipcRenderer;

export default { 
  data:{
    problemHint: "",
    matchingProblems:[],
    selectedSolution:null,
    executionInfo:null
  },
  methods:{
    find:function(){
      this.matchingProblems = solution.find(this.problemHint);
      if(this.matchingProblems
        && this.matchingProblems.length > 0
        && this.matchingProblems[0].solutions
        && this.matchingProblems[0].solutions.length > 0)
        this.selectedSolution =  this.matchingProblems[0].solutions[0];
    },
    execute:function(){
      if(this.selectedSolution)
        {
          remote.BrowserWindow.getFocusedWindow().hide();


          //todo: check environment first
            this.selectedSolution.steps.forEach(function(step){
              var result;
              eval(step.automation);
              executionInfo = result;
              ipc.send('notification',result);

            });

        }
    }
  }
}
</script>
