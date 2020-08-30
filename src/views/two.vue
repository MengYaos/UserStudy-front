<template>
    <div id="app" class="app">
        <el-header height="40px">
<!--          <b>欢迎参与！</b>-->
        </el-header>
        <el-row :gutter="20">
            <el-col :span="12" :push="6">
                <el-progress :text-inside="true" :stroke-width="20" :percentage="percentage"></el-progress>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="18" :push="3">
                <div class="grid-content bg-purple">
<!--                    <el-carousel></el-carousel>-->
                    <carousel arrow="always" :autoplay=false :loop="false" v-bind:percentage="percentage" v-on:change="change(arguments,$event)">
                        <carousel-item v-for="items in 50" :key="items" >
                            <el-row type="flex" justify="space-around" style="padding: 0 5%;">
                              <el-col :span="8">
                                <el-image :src="require('../assets/phase2/'+groupId+'_content.png')">
                                </el-image>
                              </el-col>
                                <el-col :span="8">
                                    <el-image :src="require('../assets/phase2/'+groupId+'_style.png')">
                                    </el-image>
                                </el-col>
                                <el-col :span="8">
<!--                                    <el-image :src="require('../assets/phase2/'+groupId+'_'+childIdRandom[childId]+'.png')">-->
                                    <el-image :src="require('../assets/phase2/'+groupId+'_'+renderingSequence[indexId]+'.png')">
                                    </el-image>
                                </el-col>
                            </el-row>
                        </carousel-item>
                    </carousel>
                </div>
            </el-col>
        </el-row>
      <el-row style=" margin-bottom: 20px;">
        <el-col :span="18" :push="3">
          <el-row style="">
            <el-col :span="6" class="goalTexts">
              <b style="">真实感程度</b>
            </el-col>
            <el-col :span="16">
              <el-slider
                      v-model="value1"
                      :step="1"
                      show-stops
                      :marks="marks"
                      :min=1
                      :max=10>
              </el-slider>
            </el-col>
          </el-row>
          <el-row style="margin-top: 20px">
            <el-col :span="6" class="goalTexts">
              <b>风格化程度</b>
            </el-col>
            <el-col :span="16">
              <el-slider
                      v-model="value2"
                      :step="1"
                      show-stops
                      :marks="marks"
                      :min=1
                      :max=10>
              </el-slider>
            </el-col>
          </el-row>
          <el-row style="margin-top: 20px">
            <el-col :span="6" class="goalTexts">
              <b>整体质量</b>
            </el-col>
            <el-col :span="16">
              <el-slider
                      v-model="value3"
                      :step="1"
                      show-stops
                      :marks="marks"
                      :min=1
                      :max=10>
              </el-slider>
            </el-col>
            <el-col :span="6" :push="10" style="margin-top: 30px">
                <el-button type="info" round  v-if="flag" :disabled=true>您已完成提交，感谢您的参与！</el-button>
                <el-button type="info" round  v-if="indexId<(group*children-1)&&!flag" :disabled=true>完成所有评分即可点击提交</el-button>
                <el-button type="primary" round  v-if="indexId===(group*children-1)&&!flag" @click.once="submitForm(form)">您已完成所有评分，请点击提交</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-footer>

      </el-footer>
    </div>
</template>
<script>
    import Carousel from "../components/Carousel";
    import CarouselItem from "../components/CarouselItem"
    export default {
        components: {
            Carousel,
            CarouselItem
        },

        data() {
            return {
                percentage: 2,
                group: 10,
                children: 5,
                groupId: 1,
                maxGroupId: 0,
                childId: 0,
                indexId: 0,
                lastIndexId: -1,
                value1: 8,
                value2: 8,
                value3: 8,
                contentIntegrity: [],
                stylizationLevel: [],
                overallQuality: [],
                renderingSequence: [3, 1, 4, 5, 2],
                marks: {
                    1: '1',
                    2: '2',
                    3: '3',
                    4: '4',
                    5: '5',
                    6: '6',
                    7: '7',
                    8: '8',
                    9: '9',
                    10: '10'
                },
                form: {
                    renderingSequence: '',
                    contentIntegrity: '',
                    stylizationLevel: '',
                    overallQuality: '',
                    flag: 2
                },
                flag: false,
                childIdRandom: [3, 1, 4, 5, 2]
            }
        },

        methods: {
            change(msg) {
                if (msg[0] === "right"){
                    this.indexId = msg[1];
                    if(this.indexId !== this.lastIndexId) {
                        this.lastIndexId = this.indexId;
                        // 保存上一步的值
                        this.contentIntegrity[this.indexId-1]=this.value1;
                        this.stylizationLevel[this.indexId-1]=this.value2;
                        this.overallQuality[this.indexId-1]=this.value3;
                        // //有分数为0时提示
                        // if (this.value1 === 0)
                        //     alert("内容完整性分数为0！");

                        // 控制进度条
                        // this.percentage += Math.round(1/(this.group*this.children)*100);
                        this.percentage += 1/(this.group*this.children)*100;
                        this.percentage = parseFloat(this.percentage.toFixed(2));
                        if (this.percentage > 100) {
                            this.percentage = 100;
                        }

                        if (Math.floor(this.indexId/this.children)>this.groupId-1){
                            if (this.groupId>this.maxGroupId){
                                this.generateRandom(this.children);
                                this.maxGroupId = this.groupId;
                            }
                            this.groupId += 1;
                            // this.childId=0;
                        }
                        //回显分数或者初始化分数条为8
                        if (this.indexId<this.contentIntegrity.length)
                            this.value1=this.contentIntegrity[this.indexId];
                        else
                            this.value1=8;
                        if (this.indexId<this.stylizationLevel.length)
                            this.value2=this.stylizationLevel[this.indexId];
                        else
                            this.value2=8;
                        if (this.indexId<this.overallQuality.length)
                            this.value3=this.overallQuality[this.indexId];
                        else
                            this.value3=8;
                    }
                }
                if (msg[0] === "left"){
                    this.indexId = msg[1];
                    if(this.indexId !== this.lastIndexId) {
                        this.lastIndexId = this.indexId;
                        // 保存上一步的值
                        this.contentIntegrity[this.indexId+1]=this.value1;
                        this.stylizationLevel[this.indexId+1]=this.value2;
                        this.overallQuality[this.indexId+1]=this.value3;

                        // 控制进度条
                        this.percentage -= 1/(this.group*this.children)*100;
                        this.percentage = parseFloat(this.percentage.toFixed(2));
                        if (this.percentage < 0) {
                            this.percentage = 0;
                        }

                        this.groupId = Math.floor(this.indexId/this.children) + 1;

                        //回显分数
                        this.value1=this.contentIntegrity[this.indexId];
                        this.value2=this.stylizationLevel[this.indexId];
                        this.value3=this.overallQuality[this.indexId];
                    }
                }
            },
            generateRandom(count) {
                this.childIdRandom.sort(function(){ return 0.5 - Math.random(); });
                let sequenceIndex = this.renderingSequence.length;
                // console.log(this.childIdRandom);
                for (let i=0; i<count; i++){
                    // console.log(sequenceIndex+i);
                    // console.log(this.childIdRandom[i]);
                    this.renderingSequence[sequenceIndex+i]=this.childIdRandom[i];
                }
            },
            submitForm(form) {
                const _this=this;
                //保存最后一步未保存的分数
                if (_this.contentIntegrity.length<this.group*this.children){
                    this.contentIntegrity[this.indexId]=this.value1;
                    this.stylizationLevel[this.indexId]=this.value2;
                    this.overallQuality[this.indexId]=this.value3;
                }

                form.renderingSequence=this.renderingSequence.join();
                form.contentIntegrity=this.contentIntegrity.join();
                form.stylizationLevel=this.stylizationLevel.join();
                form.overallQuality=this.overallQuality.join();

                axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
                axios.post('http://49.234.232.252:8088/save', form).then(function (resp) {
                // axios.post('http://localhost:8088/save', form).then(function (resp) {
                    console.log(resp.data.data);
                    if (resp.data.data === 'success') {
                        _this.flag=true;
                        // _this.$alert('十分感谢您的参与，谢谢！', '', {
                        //     confirmButtonText: '确定',
                        // })
                    } else {
                        _this.$message('添加失败！');
                    }
                })
            }
        }
    }
</script>

<style>
    .app {
        background: #dae8f9;
        /*overflow: hidden;*/
        position: fixed;
        height: 100%;
        width: 100%;
    }

    .el-header {
        background-color: #5b6270;
    }

    .el-image {
        width: 256px;
        height: 256px;
        margin-left: 30px;
    }

    .el-carousel {
        width: 100%;
        /*height: 18%;*/
    }

    .el-row {
        margin-top: 1%;
    }

    .el-col {
        border-radius: 4px;
    }

    .grid-content {
        border-radius: 4px;
        height: 100%;
    }

    .goalTexts {
        margin-top: 10px;
        padding: 0 0 0 8%;
    }

    .el-carousel__arrow__el-carousel__arrow--left{
        display: block;
    }

</style>
