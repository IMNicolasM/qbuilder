<template>
  <div id="builderEditor" class="row">
    <!--Panels-->
    <div class="preview-panels" :style="`width: ${store.panelWidth}`">
      <layout-panel @selected="val => store.layoutSelected = val"/>
    </div>
    <!-- Preview -->
    <div class="preview-content" :style="`width: calc(100vw - ${store.panelWidth})`">
      <!--Actions-->
      <div class="preview-content__actions row justify-between items-center">
        <div class="q-px-md q-py-sm text-primary text-h6">
          Layout (PT)
        </div>
        <q-tabs v-if="store.layoutSelected" v-model="layoutTab" align="right" inline-label
                no-caps indicator-color="transparent" :active-bg-color="tabColor" active-color="white"
                :content-class="`text-${tabColor} bg-grey-2`">
          <q-tab name="preview" label="Preview (PT)" icon="fa-light fa-eye"/>
          <q-tab name="builder" label="Builder (PT)" icon="fa-light fa-border-none"/>
        </q-tabs>
      </div>
      <q-separator :color="tabColor" size="3px"/>
      <!--Box with layout-->
      <div class="preview-content__box">
        <q-tab-panels v-if="store.layoutSelected" v-model="layoutTab" animated transition-prev="scale"
                      transition-next="scale">
          <q-tab-panel name="preview" class="q-pa-none">
            <iframe-post style="height: calc(100vh - 60px)" ref="refIframePost"/>
          </q-tab-panel>
          <q-tab-panel name="builder" class="q-pa-none">
            Builder...
          </q-tab-panel>
        </q-tab-panels>
        <!--Message to choose a layout-->
        <div v-else class="text-center q-py-lg">
          <q-icon name="fa-light fa-exclamation-circle" size="60px" color="warning"/>
          <div class="q-mt-md text-h5 text-blue-grey"> Choose a layout (PT)</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {defineComponent} from 'vue'
import controller from '@imagina/qbuilder/_pages/admin/editor/controller'
//components
import iframePost from "@imagina/qsite/_components/master/iframePost.vue";
import layoutPanel from '@imagina/qbuilder/_components/layoutPanel'

export default defineComponent({
  props: {},
  components: {
    layoutPanel,
    iframePost
  },
  setup() {
    return {...controller()}
  }
})
</script>
<style lang="stylus">
#builderEditor
  .preview-panels, .preview-content
    height 100vh
    max-height 100vh

  .preview-content
    background-color $blue-grey-1
    padding 30px 85px
    overflow scroll

    &__actions
      background-color white

    //border-bottom 1px solid lightgrey

    &__box
      background-color white
</style>