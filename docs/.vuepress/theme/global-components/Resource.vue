<template>
  <div>
    <div class="header-tabs">
      <a
        @click="activeResource = 'mqttClients'"
        :class="{ 'crud-title': true, active: activeResource === 'mqttClients' }"
        >MQTT Clients</a
      >
      <a
        @click="activeResource = 'mqttTools'"
        :class="{ 'crud-title': true, active: activeResource === 'mqttTools' }"
        >MQTT Tools</a
      >
      <a
        @click="activeResource = 'coapClients'"
        :class="{ 'crud-title': true, active: activeResource === 'coapClients' }"
        >CoAP Clients</a
      >
      <a
        @click="activeResource = 'hardwareLibrary'"
        :class="{ 'crud-title': true, active: activeResource === 'hardwareLibrary' }"
      >
        Hardware Library
      </a>
      <a
        @click="activeResource = 'benchmarkTools'"
        :class="{ 'crud-title': true, active: activeResource === 'benchmarkTools' }"
        >Benchmark Tools</a
      >
    </div>
    <div class="columns is-multiline sdktools">
      <div class="column is-3" v-for="(item, index) in resource[activeResource]" :key="index">
        <a :href="item.url" target="_blank" rel="noopener">
          <div class="sdktools-item">
            <div class="sdktools-item__header">
              <img
                class="sdktools-item__img"
                :src="`/images/sdk_tools/${item.image}`"
                alt="image"
                width="64px"
                height="64px"
              />
              <p class="sdktools-item__title">{{ item.image_desc }}</p>
            </div>
            <div class="sdktools-item__footer">
              <p>{{ item.title }}</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Resource',

  data() {
    return {
      activeResource: 'mqttClients',
      resource: {
        mqttClients: [
          {
            id: '7',
            title: 'Eclipse Paho C',
            image: 'c.png',
            image_desc: 'C',
            url: 'https://www.eclipse.org/paho/clients/c/',
            category: 'MQTT_Clients',
            category_zh: 'MQTT 客户端库',
            order: '2',
          },
          {
            id: '12',
            title: 'Embedded C',
            image: 'c.png',
            image_desc: 'C',
            url: 'https://www.eclipse.org/paho/clients/c/embedded/',
            category: 'MQTT_Clients',
            category_zh: 'MQTT 客户端库',
            order: '2',
          },
          {
            id: '13',
            title: 'libmosquitto',
            image: 'c.png',
            image_desc: 'C',
            url: 'http://mosquitto.org/',
            category: 'MQTT_Clients',
            category_zh: 'MQTT 客户端库',
            order: '2',
          },
          {
            id: '14',
            title: 'libemqtt',
            image: 'c.png',
            image_desc: 'C',
            url: 'https://github.com/menudoproblema/libemqtt',
            category: 'MQTT_Clients',
            category_zh: 'MQTT 客户端库',
            order: '2',
          },
          {
            id: '40',
            title: 'wolfMQTT',
            image: 'c.png',
            image_desc: 'C',
            url: 'https://github.com/wolfSSL/wolfMQTT',
            category: 'MQTT_Clients',
            category_zh: 'MQTT 客户端库',
            order: '2',
          },
          {
            id: '41',
            title: 'Eclipse Paho C++',
            image: 'cpp.png',
            image_desc: 'C++',
            url: 'https://www.eclipse.org/paho/clients/cpp/',
            category: 'MQTT_Clients',
            category_zh: 'MQTT 客户端库',
            order: '2',
          },
          {
            id: '42',
            title: 'Embedded C++',
            image: 'cpp.png',
            image_desc: 'C++',
            url: 'https://www.eclipse.org/paho/clients/c/embedded/',
            category: 'MQTT_Clients',
            category_zh: 'MQTT 客户端库',
            order: '2',
          },
          {
            id: '43',
            title: 'CocoaMQTT',
            image: 'swift.png',
            image_desc: 'Swift',
            url: 'https://github.com/emqtt/CocoaMQTT',
            category: 'MQTT_Clients',
            category_zh: 'MQTT 客户端库',
            order: '2',
          },
          {
            id: '44',
            title: 'emqttc',
            image: 'erlang.png',
            image_desc: 'Erlang',
            url: 'https://github.com/emqtt/emqttc',
            category: 'MQTT_Clients',
            category_zh: 'MQTT 客户端库',
            order: '2',
          },
          {
            id: '45',
            title: 'erlmqtt',
            image: 'erlang.png',
            image_desc: 'Erlang',
            url: 'https://github.com/squaremo/erlmqtt',
            category: 'MQTT_Clients',
            category_zh: 'MQTT 客户端库',
            order: '2',
          },
          {
            id: '46',
            title: 'Eclipse Paho Java',
            image: 'java.png',
            image_desc: 'Java',
            url: 'https://github.com/eclipse/paho.mqtt.java',
            category: 'MQTT_Clients',
            category_zh: 'MQTT 客户端库',
            order: '2',
          },
          {
            id: '47',
            title: 'Xenqtt',
            image: 'java.png',
            image_desc: 'Java',
            url: 'https://github.com/TwoGuysFromKabul/xenqtt',
            category: 'MQTT_Clients',
            category_zh: 'MQTT 客户端库',
            order: '2',
          },
          {
            id: '48',
            title: 'MeQanTT',
            image: 'java.png',
            image_desc: 'Java',
            url: 'https://github.com/AlbinTheander/MeQanTT',
            category: 'MQTT_Clients',
            category_zh: 'MQTT 客户端库',
            order: '2',
          },
          {
            id: '49',
            title: 'mqtt-client',
            image: 'java.png',
            image_desc: 'Java',
            url: 'https://github.com/fusesource/mqtt-client',
            category: 'MQTT_Clients',
            category_zh: 'MQTT 客户端库',
            order: '2',
          },
          {
            id: '50',
            title: 'Eclipse Paho',
            image: 'javascript.png',
            image_desc: 'Javascript',
            url: 'https://github.com/eclipse/paho.mqtt.javascript',
            category: 'MQTT_Clients',
            category_zh: 'MQTT 客户端库',
            order: '2',
          },
          {
            id: '51',
            title: 'MQTT.js',
            image: 'javascript.png',
            image_desc: 'Javascript',
            url: 'https://github.com/mqttjs/MQTT.js',
            category: 'MQTT_Clients',
            category_zh: 'MQTT 客户端库',
            order: '2',
          },
          {
            id: '52',
            title: 'node_mqtt_client',
            image: 'javascript.png',
            image_desc: 'Javascript',
            url: 'https://github.com/yilun/node_mqtt_client',
            category: 'MQTT_Clients',
            category_zh: 'MQTT 客户端库',
            order: '2',
          },
          {
            id: '53',
            title: 'ascoltatori',
            image: 'javascript.png',
            image_desc: 'Javascript',
            url: 'https://github.com/mcollina/ascoltatori',
            category: 'MQTT_Clients',
            category_zh: 'MQTT 客户端库',
            order: '2',
          },
          {
            id: '54',
            title: 'mqttIO-objC',
            image: 'objectivec.png',
            image_desc: 'Objective-C',
            url: 'https://github.com/GrayWang/mqttIO-objC',
            category: 'MQTT_Clients',
            category_zh: 'MQTT 客户端库',
            order: '2',
          },
          {
            id: '55',
            title: 'MQTTKit',
            image: 'objectivec.png',
            image_desc: 'Objective-C',
            url: 'https://github.com/jmesnil/MQTTKit',
            category: 'MQTT_Clients',
            category_zh: 'MQTT 客户端库',
            order: '2',
          },
          {
            id: '56',
            title: 'MQTT-Client',
            image: 'objectivec.png',
            image_desc: 'Objective-C',
            url: 'https://github.com/ckrey/MQTT-Client-Framework',
            category: 'MQTT_Clients',
            category_zh: 'MQTT 客户端库',
            order: '2',
          },
          {
            id: '57',
            title: 'phpMQTT',
            image: 'php.png',
            image_desc: 'PHP',
            url: 'https://github.com/bluerhinos/phpMQTT',
            category: 'MQTT_Clients',
            category_zh: 'MQTT 客户端库',
            order: '2',
          },
          {
            id: '58',
            title: 'Mosquitto-PHP',
            image: 'php.png',
            image_desc: 'PHP',
            url: 'https://github.com/mgdm/Mosquitto-PHP',
            category: 'MQTT_Clients',
            category_zh: 'MQTT 客户端库',
            order: '2',
          },
          {
            id: '59',
            title: "sskaje's MQTT library",
            image: 'php.png',
            image_desc: 'PHP',
            url: 'https://github.com/sskaje/mqtt',
            category: 'MQTT_Clients',
            category_zh: 'MQTT 客户端库',
            order: '2',
          },
          {
            id: '60',
            title: 'Eclipse Paho Python',
            image: 'python.png',
            image_desc: 'Python',
            url: 'https://github.com/eclipse/paho.mqtt.python',
            category: 'MQTT_Clients',
            category_zh: 'MQTT 客户端库',
            order: '2',
          },
          {
            id: '61',
            title: 'nyamuk',
            image: 'python.png',
            image_desc: 'Python',
            url: 'https://github.com/iwanbk/nyamuk',
            category: 'MQTT_Clients',
            category_zh: 'MQTT 客户端库',
            order: '2',
          },
          {
            id: '62',
            title: 'MQTT-For-Twisted',
            image: 'python.png',
            image_desc: 'Python',
            url: 'https://github.com/adamvr/MQTT-For-Twisted-Python',
            category: 'MQTT_Clients',
            category_zh: 'MQTT 客户端库',
            order: '2',
          },
          {
            id: '63',
            title: 'HBMQTT',
            image: 'python.png',
            image_desc: 'Python',
            url: 'https://github.com/beerfactory/hbmqtt',
            category: 'MQTT_Clients',
            category_zh: 'MQTT 客户端库',
            order: '2',
          },
          {
            id: '64',
            title: 'ruby-mqtt',
            image: 'ruby.png',
            image_desc: 'Ruby',
            url: 'https://github.com/njh/ruby-mqtt',
            category: 'MQTT_Clients',
            category_zh: 'MQTT 客户端库',
            order: '2',
          },
          {
            id: '65',
            title: 'mosquitto',
            image: 'ruby.png',
            image_desc: 'Ruby',
            url: 'https://github.com/xively/mosquitto',
            category: 'MQTT_Clients',
            category_zh: 'MQTT 客户端库',
            order: '2',
          },
          {
            id: '85',
            title: 'Aphid',
            image: 'swift.png',
            image_desc: 'Swift',
            url: 'https://github.com/IBM-Swift/Aphid',
            category: 'MQTT_Clients',
            category_zh: 'MQTT 客户端库',
            order: '2',
          },
          {
            id: '86',
            title: 'SwiftMQTT',
            image: 'swift.png',
            image_desc: 'Swift',
            url: 'https://github.com/aciidb0mb3r/SwiftMQTT',
            category: 'MQTT_Clients',
            category_zh: 'MQTT 客户端库',
            order: '2',
          },
        ],
        mqttTools: [
          {
            id: '92',
            title: 'MQTT Web Toolkit',
            image: 'mqtt_tools.png',
            image_desc: 'EMQ',
            url: 'http://tools.emqx.io',
            category: 'MQTT_Tools',
            category_zh: 'MQTT 工具',
            order: '1',
          },
          {
            id: '93',
            title: 'MQTTX',
            image: 'mqttx.png',
            image_desc: 'MQTTX',
            url: 'https://github.com/emqx/MQTTX',
            category: 'MQTT_Tools',
            category_zh: 'MQTT 工具',
            order: '2',
          },
        ],
        coapClients: [
          {
            id: '67',
            title: 'Microcoap ',
            image: 'c.png',
            image_desc: 'C',
            url: 'https://github.com/1248/microcoap',
            category: 'CoAP_Clients',
            category_zh: 'CoAP 客户端库',
            order: '3',
          },
          {
            id: '68',
            title: 'Cantcoap ',
            image: 'c.png',
            image_desc: 'C',
            url: 'https://github.com/staropram/cantcoap',
            category: 'CoAP_Clients',
            category_zh: 'CoAP 客户端库',
            order: '3',
          },
          {
            id: '69',
            title: 'Lobaro-coap ',
            image: 'c.png',
            image_desc: 'C',
            url: 'http://www.lobaro.com/lobaro-coap/ ',
            category: 'CoAP_Clients',
            category_zh: 'CoAP 客户端库',
            order: '3',
          },
          {
            id: '15',
            title: 'Libcoap ',
            image: 'c.png',
            image_desc: 'C',
            url: 'https://github.com/obgm/libcoap',
            category: 'CoAP_Clients',
            category_zh: 'CoAP 客户端库',
            order: '3',
          },
          {
            id: '70',
            title: 'Gen_coap ',
            image: 'erlang.png',
            image_desc: 'Erlang',
            url: 'https://github.com/gotthardp/gen_coap',
            category: 'CoAP_Clients',
            category_zh: 'CoAP 客户端库',
            order: '3',
          },
          {
            id: '72',
            title: 'NCoAP ',
            image: 'java.png',
            image_desc: 'JAVA',
            url: 'https://github.com/okleine/nCoAP',
            category: 'CoAP_Clients',
            category_zh: 'CoAP 客户端库',
            order: '3',
          },
          {
            id: '16',
            title: 'Californium ',
            image: 'java.png',
            image_desc: 'JAVA',
            url: 'https://github.com/eclipse/californium ',
            category: 'CoAP_Clients',
            category_zh: 'CoAP 客户端库',
            order: '3',
          },
          {
            id: '73',
            title: 'Node-coap ',
            image: 'nodejs.png',
            image_desc: ' Node.js',
            url: 'https://github.com/mcollina/node-coap',
            category: 's',
            category_zh: 'CoAP 客户端库',
            order: '3',
          },
          {
            id: '17',
            title: 'Coapthon',
            image: 'python.png',
            image_desc: 'Python',
            url: 'https://github.com/Tanganelli/CoAPthon',
            category: 'CoAP_Clients',
            category_zh: 'CoAP 客户端库',
            order: '3',
          },
          {
            id: '71',
            title: 'Aiocoap ',
            image: 'python.png',
            image_desc: 'Python',
            url: 'https://github.com/chrysn/aiocoap ',
            category: 'CoAP_Clients',
            category_zh: 'CoAP 客户端库',
            order: '3',
          },
        ],
        hardwareLibrary: [
          {
            id: '81',
            title: 'Air202',
            image: 'Hardware_library/Air202.png',
            image_desc: '',
            url: 'http://www.openluat.com/',
            category: 'Hardware_library',
            category_zh: '硬件开发库',
            order: '4',
          },
          {
            id: '82',
            title: 'EMW3088',
            image: 'Hardware_library/EMW3088.jpg',
            image_desc: '',
            url: 'http://www.mxchip.com/product/wifi_product/28',
            category: 'Hardware_library',
            category_zh: '硬件开发库',
            order: '4',
          },
          {
            id: '83',
            title: 'ESP8266',
            image: 'Hardware_library/ESP8266.png',
            image_desc: '',
            url: 'http://espressif.com/en/products/hardware/esp8266ex/overviewesp8266ex/overview',
            category: 'Hardware_library',
            category_zh: '硬件开发库',
            order: '4',
          },
          {
            id: '74',
            title: '88MW300',
            image: 'Hardware_library/88MW300.png',
            image_desc: '',
            url: 'https://www.marvell.com/microcontrollers/88MW300/302/',
            category: 'Hardware_library',
            category_zh: '硬件开发库',
            order: '4',
          },
          {
            id: '75',
            title: 'CC3200',
            image: 'Hardware_library/CC3200-1.jpg',
            image_desc: '',
            url: 'http://www.ti.com/product/CC3200',
            category: 'Hardware_library',
            category_zh: '硬件开发库',
            order: '4',
          },
          {
            id: '76',
            title: 'ESP12F',
            image: 'Hardware_library/esp12f.png',
            image_desc: '',
            url: 'https://www.ai-thinker.com/product/esp8266',
            category: 'Hardware_library',
            category_zh: '硬件开发库',
            order: '4',
          },
          {
            id: '77',
            title: 'MT7697',
            image: 'Hardware_library/MediaTek-MT7697.jpg',
            image_desc: '',
            url: 'https://labs.mediatek.com/en/chipset/MT7697',
            category: 'Hardware_library',
            category_zh: '硬件开发库',
            order: '4',
          },
          {
            id: '78',
            title: 'NodeMCU',
            image: 'Hardware_library/NodeMCU.jpg',
            image_desc: '',
            url: 'http://nodemcu.com/index_en.html',
            category: 'Hardware_library',
            category_zh: '硬件开发库',
            order: '4',
          },
          {
            id: '79',
            title: 'Wrtnode7',
            image: 'Hardware_library/wrtnode7.png',
            image_desc: '',
            url: 'http://wrtnode.cc/newhtml/7/7.html#/',
            category: 'Hardware_library',
            category_zh: '硬件开发库',
            order: '4',
          },
          {
            id: '80',
            title: 'ESP32',
            image: 'Hardware_library/ESP32-C003.png',
            image_desc: '',
            url: 'https://www.ai-thinker.com/product/esp32',
            category: 'Hardware_library',
            category_zh: '硬件开发库',
            order: '4',
          },
        ],
        benchmarkTools: [
          {
            id: '33',
            title: 'mqtt-jmeter',
            image: 'xmeter.png',
            image_desc: 'Xmeter',
            url: 'https://github.com/emqx/mqtt-jmeter',
            category: 'test',
            category_zh: '开发测试工具',
            order: '6',
          },
          {
            id: '30',
            title: 'xmeter',
            image: 'xmeter.png',
            image_desc: 'Xmeter',
            url: 'https://www.xmeter.net/',
            category: 'test',
            category_zh: '开发测试工具',
            order: '6',
          },
          {
            id: '32',
            title: 'coap-jmeter',
            image: 'xmeter.png',
            image_desc: 'Xmeter',
            url: 'https://github.com/emqx/coap-jmeter',
            category: 'test',
            category_zh: '开发测试工具',
            order: '6',
          },
          {
            id: '90',
            title: 'jmeter',
            image: 'apache.png',
            image_desc: 'Apache',
            url: 'http://jmeter.apache.org/',
            category: 'test',
            category_zh: '开发测试工具',
            order: '6',
          },
          {
            id: '91',
            title: 'locust',
            image: 'locust.png',
            image_desc: 'Locust',
            url: 'http://locust.io/',
            category: 'test',
            category_zh: '开发测试工具',
            order: '6',
          },
        ],
      },
    }
  },
}
</script>

<style>
.header-tabs {
  white-space: nowrap;
  overflow-x: auto;
  height: 40px;
  font-size: 14px;
  width: 100%;
  border-bottom: 2px solid #e4e7e9;
  padding-bottom: 10px;
  margin-bottom: 40px;
  margin-top: 60px;
}
.header-tabs a {
  cursor: pointer;
  text-decoration: none !important;
  color: #9297aa !important;
  margin: 0 34px 34px 0;
  padding-bottom: 10px;
}
.header-tabs a:hover {
  color: #333844 !important;
}
.header-tabs a.active {
  color: #333844 !important;
  border-bottom: 2px solid #2fc285;
}
.sdktools {
  text-align: center;
}
.sdktools a {
  text-decoration: none !important;
}
.sdktools-item img {
  pointer-events: none;
}
.sdktools-item__header {
  background: #f6f7f9;
  padding: 40px 0 16px;
}
.sdktools-item__header p {
  color: #9297aa;
  font-size: 14px;
  margin: 12px 0 0;
}
.sdktools-item__footer p {
  background: #edf1f5;
  padding: 8px 0;
  margin: 0;
  color: #62697c;
  font-size: 18px;
}
</style>
