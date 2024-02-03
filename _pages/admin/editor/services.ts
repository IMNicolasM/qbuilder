import baseService from '@imagina/qcrud/_services/baseService'
import {ModulesData} from "@imagina/qbuilder/_components/blocksPanel/interface";

export default {
  getBlockConfigs(refresh = false, params = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      const requestParams = {refresh, params}
      //Request
      baseService.index('apiRoutes.qbuilder.layouts', requestParams).then(response => {
        resolve({
          ...response,
          data: response.data.sort((a, b) => b.id - a.id)
        })
      }).catch(error => reject(error))
    })
  },
  //Get Config about Modules Block
  getModuleBlocks(refresh = false, params = {}): Promise<ModulesData> {
    return new Promise((resolve, reject) => {
      //Params
      let requestParams = {
        refresh,
        params
      }
      //Request
      baseService.index('apiRoutes.qsite.configs', requestParams).then(response => {
        resolve(response.data)
      }).catch(error => reject(error))
    })
  },
  //Bulk update blocks
  blocksBulkUpdate(blocks): Promise<any> {
    return new Promise((resolve, reject) => {
      //Request params
      const requestParams = {
        notToSnakeCase: [...(Object.keys(blocks[0].attributes) ?? []), "component", "entity", "attributes"]
      }
      //Request
      baseService.update('apiRoutes.qbuilder.blocks', 'bulk/update', blocks, requestParams).then(response => {
        resolve(true)
      }).catch(error => reject(error))
    })
  },
  //Delete block
  deleteblock(blockId): Promise<any> {
    return new Promise((resolve, reject) => {
      baseService.delete('apiRoutes.qbuilder.blocks', blockId).then(response => {
        resolve(true)
      }).catch(error => reject(error))
    })
  },
}
