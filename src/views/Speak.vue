<template>
  <div>
    <div class="w-full bg-black rounded-full h-3.5 p-0.5">
      <div class="bg-primary h-2.5 rounded-full" style="width: 70%"></div>
    </div>
    <div class="main-dialogue">
      <div>
        <div class="uppercase mb-3">
          <h1>{{ getValue(dial, "0.name") }}</h1>
          <h1>{{ getValue(dial, "0.title") }}</h1>
        </div>
        <div class="dialogue-record">
          <h3>
            <!-- {{ item.dialog[randomint].text }} -->
            {{ getValue(dial, "0.dialog." + randomint + ".text") }}
          </h3>
        </div>
        <div class="dialogue-result text-gray-500">
          <h3>{{ getValue(dial, "0.dialog." + randomint + ".text") }}</h3>
        </div>
      </div>
      <div class="flex justify-center mt-12">
        <div
          class="bg-primary rounded-full p-4 border-black border-4 cursor-pointer justify-items-center"
          @click="
            buttonrecord == false ? start() : (stop(), (selesai = true));
            buttonrecord = !buttonrecord;
          "
        >
          <img
            src="../assets/img/mic.svg"
            alt=""
            class="w-10 m-auto"
            id="record"
          />
          <h3>{{ buttonrecord == false ? "MULAI" : "BERHENTI" }}</h3>
        </div>
        <!-- <div class="audio-controls">
          <button id="record" @click="start()">Record</button>
          <button id="stop" @click="stop()">Stop</button>
          <audio id="audio" controls></audio>
          <button id="send" @click="sendToAPI()">SEND</button>
        </div> -->
      </div>
    </div>
    <button class="btn-shadow absolute bottom-8" @click="router.go(-1)">
      Kembali
    </button>
    <button
      class="btn-shadow absolute right-8 bottom-8 md:w-52"
      @click="sendToAPI()"
      v-show="selesai"
    >
      Selesai
    </button>
  </div>
</template>

<script setup>
import _ from "lodash";
import { useUserStore } from "../stores/user";
import { useDatabaseStore } from "../stores/database";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { async } from "@firebase/util";
import axios from "axios";

let buttonrecord = ref(false);
// initialize mic

let leftchannel = [];
let rightchannel = [];
let recorder = null;
let recording = false;
let recordingLength = 0;
let volume = null;
let audioInput = null;
let sampleRate = null;
let AudioContext = window.AudioContext || window.webkitAudioContext;
let context = null;
let analyser = null;
let micSelect = document.querySelector("#micSelect");
let stream = ref(null);
let tested = false;
let finalWAV = null;
let constraints = null;
// intialize text =================\
// ===================================

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const databaseStore = useDatabaseStore();
databaseStore.getUser();
databaseStore.getConversation(route.params.id);
// if (databaseStore.conversation.length == 0) {
// }
const user = databaseStore.users;
const dial = databaseStore.conversation;
console.log(databaseStore.randomdialog);
const selesai = ref(false);
let randomint = Math.floor(Math.random() * databaseStore.randomdialog);

// function randint() {
//   randomint = Math.floor(Math.random() * getValue(dial, "0.dialog").length);
// }
function getValue(object, string, defaultValue = "") {
  return _.get(object, string, defaultValue);
}

function endDialog(scoreres) {
  let accuracy = getValue(scoreres, "data.NBest.0.AccuracyScore");
  let fluency = getValue(scoreres, "data.NBest.0.FluencyScore");
  let completeness = getValue(scoreres, "data.NBest.0.CompletenessScore");
  let pronunciation = getValue(scoreres, "data.NBest.0.PronScore");

  let scoreresult = (accuracy + fluency + completeness + pronunciation) / 4;

  let currentdial = getValue(dial, "0.id");

  // let scoreresult = Math.floor(Math.random() * 100);
  databaseStore.score = scoreresult;

  let id = getValue(user, "0.id");
  let level = getValue(user, "0.level");
  let dialog = getValue(user, "0.dialog");
  let dialog_name = "Dialog " + level + "-" + dialog;
  let score = getValue(user, "0.score");
  let rank = 0;
  if (dialog == 30) {
    dialog = 30;
  } else if (currentdial < dialog) {
    dialog = dialog;
  } else {
    dialog = dialog + 1;
  }
  score[dialog - 1]["dialog_score"] = parseInt(scoreresult);

  if (getValue(user, "0.dialog") == 9 || getValue(user, "0.dialog") == 19) {
    level = level + 1;
    // } else if (getValue(user, "0.dialog") == 30) {
    //   level = level;
  } else {
    level = level;
  }
  let score_total = score.reduce((accumulator, object) => {
    return accumulator + object.dialog_score;
  }, 0);

  databaseStore.updateUser(
    id,
    level,
    dialog,
    dialog_name,
    score_total,
    score,
    rank
  );
}

setupAPI();
// intialize API ------------------

let AXIOS_URL = `https://southeastasia.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-us`;

async function setupAPI() {
  //--------------------------------------------------

  try {
    window.stream = stream = await getStream();
    console.log("Got stream");
  } catch (err) {
    alert("Issue getting mic", err);
  }
  const deviceInfos = await navigator.mediaDevices.enumerateDevices();
  function getStream(constraints) {
    if (!constraints) {
      constraints = { audio: true, video: false };
    }
    return navigator.mediaDevices.getUserMedia(constraints);
  }
  setUpRecording();
}

async function setUpRecording() {
  context = new AudioContext();
  sampleRate = context.sampleRate;
  // creates a gain node
  volume = context.createGain();
  // creates an audio node from teh microphone incoming stream
  audioInput = context.createMediaStreamSource(stream);
  // Create analyser
  analyser = context.createAnalyser();
  // connect audio input to the analyser
  audioInput.connect(analyser);
  // connect analyser to the volume control
  // analyser.connect(volume);
  let bufferSize = 2048;
  let recorder = context.createScriptProcessor(bufferSize, 2, 2);
  // we connect the volume control to the processor
  // volume.connect(recorder);
  analyser.connect(recorder);
  // finally connect the processor to the output
  recorder.connect(context.destination);
  recorder.onaudioprocess = function (e) {
    // Check
    if (!recording) return;
    // Do something with the data, i.e Convert this to WAV
    console.log("recording");
    let left = e.inputBuffer.getChannelData(0);
    let right = e.inputBuffer.getChannelData(1);
    if (!tested) {
      tested = true;
      // if this reduces to 0 we are not getting any sound
      if (!left.reduce((a, b) => a + b)) {
        alert("There seems to be an issue with your Mic");
        // clean up;
        stop();
        stream.getTracks().forEach(function (track) {
          track.stop();
        });
        context.close();
      }
    }
    // we clone the samples
    leftchannel.push(new Float32Array(left));
    rightchannel.push(new Float32Array(right));
    recordingLength += bufferSize;
  };
}
function mergeBuffers(channelBuffer, recordingLength) {
  let result = new Float32Array(recordingLength);
  let offset = 0;
  let lng = channelBuffer.length;
  for (let i = 0; i < lng; i++) {
    let buffer = channelBuffer[i];
    result.set(buffer, offset);
    offset += buffer.length;
  }
  return result;
}

function interleave(leftChannel, rightChannel) {
  let length = leftChannel.length + rightChannel.length;
  let result = new Float32Array(length);
  let inputIndex = 0;
  for (let index = 0; index < length; ) {
    result[index++] = leftChannel[inputIndex];
    result[index++] = rightChannel[inputIndex];
    inputIndex++;
  }
  return result;
}

function writeUTFBytes(view, offset, string) {
  let lng = string.length;
  for (let i = 0; i < lng; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

function start() {
  recording = true;
  leftchannel.length = rightchannel.length = 0;
  recordingLength = 0;
  console.log("context: ", !!context);
  if (!context) setUpRecording();
}

async function stop() {
  console.log("Stop");
  recording = false;
  // we flat the left and right channels down
  let leftBuffer = mergeBuffers(leftchannel, recordingLength);
  let rightBuffer = mergeBuffers(rightchannel, recordingLength);
  // we interleave both channels together
  let interleaved = interleave(leftBuffer, rightBuffer);
  ///////////// WAV Encode /////////////////
  // from http://typedarray.org/from-microphone-to-wav-with-getusermedia-and-web-audio/
  //
  // we create our wav file
  let buffer = new ArrayBuffer(44 + interleaved.length * 2);
  let view = new DataView(buffer);
  // RIFF chunk descriptor
  writeUTFBytes(view, 0, "RIFF");
  view.setUint32(4, 44 + interleaved.length * 2, true);
  writeUTFBytes(view, 8, "WAVE");
  // FMT sub-chunk
  writeUTFBytes(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  // stereo (2 channels)
  view.setUint16(22, 2, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 4, true);
  view.setUint16(32, 4, true);
  view.setUint16(34, 16, true);
  // data sub-chunk
  writeUTFBytes(view, 36, "data");
  view.setUint32(40, interleaved.length * 2, true);
  // write the PCM samples
  let lng = interleaved.length;
  let index = 44;
  let volume = 1;
  for (let i = 0; i < lng; i++) {
    view.setInt16(index, interleaved[i] * (0x7fff * volume), true);
    index += 2;
  }
  // our final binary blob
  const blob = new Blob([view], { type: "audio/wav" });
  const audioUrl = URL.createObjectURL(blob);
  console.log("BLOB ", blob);
  console.log("URL ", audioUrl);
  // document.querySelector("#audio").setAttribute("src", audioUrl);

  finalWAV = blob;
  // const link = document.querySelector('#download');
  // link.setAttribute('href', audioUrl);
  // link.download = 'output.wav';
  // selesai = true;
}

function sendToAPI() {
  databaseStore.loadingDoc = true;
  let referenceText = getValue(dial, "0.dialog." + randomint + ".text");
  let pronAssessmentParamsJson =
    `{"ReferenceText":"` +
    referenceText +
    `","GradingSystem":"HundredMark","Dimension":"Comprehensive"}`;
  let AXIOS_HEADERS = {
    // 'Content-Type': 'audio/wav',
    "Content-Type": "audio/wav; codecs=audio/pcm; samplerate=16000",
    "Ocp-Apim-Subscription-Key": "3411efc5fd654b158d07da550c40388c",
    // Host: 'southeastasia.stt.speech.microsoft.com',
    "Transfer-Encoding": "chunked",
    Expect: "100-continue",
    "Pronunciation-Assessment": window.btoa(
      unescape(encodeURIComponent(pronAssessmentParamsJson))
    ),
  };
  let fd = new FormData();
  fd.append("audio_file", finalWAV);
  console.log("hasil wav");
  console.log(finalWAV);
  axios
    .post(AXIOS_URL, finalWAV, { headers: AXIOS_HEADERS })
    .then((res) => {
      console.log(res);
      databaseStore.resultscore = res;
      endDialog(res);
      router.push("/score/" + route.params.level + "/" + route.params.id);
    })
    .catch((e) => console.log(e.response))
    .finally((databaseStore.loadingDoc = false));
}

function pause() {
  recording = false;
  context.suspend();
}
function resume() {
  recording = true;
  context.resume();
}
// document.querySelector("#record").onclick = (e) => {
//   console.log("Start recording");
//   start();
// };

// document.querySelector("#stop").onclick = (e) => {
//   stop();
// };

// document.querySelector("#send").onclick = (e) => {
//   sendToAPI();
// };
</script>
