//Constants
const MAX_BEATS = 16;
const BASS01_BEATS = [MAX_BEATS];
const SNARE01_BEATS = [MAX_BEATS];
const HIHAT01_BEATS = [MAX_BEATS];
const RIDE_BEATS = [MAX_BEATS];
const BASS02_BEATS = [MAX_BEATS];
const SNARE02_BEATS = [MAX_BEATS];
const HIHAT02_BEATS = [MAX_BEATS];
const CRASH_BEATS = [MAX_BEATS];

//Variables
var isPlaying = false;
var currentBeat = 0;
var tempo = 120;  //Beats per minute - TODO: adjust this from UI
var timer;

function Reset() {
    console.debug("Resetting sequencer");
    clearInterval(timer);
    timer = window.setInterval("Update()", TempoToMillis(tempo));  
    currentBeat = 0;

    //Clear the stored beats
    for(var i = 0; i < MAX_BEATS; i++) {
        BASS01_BEATS[i] = 0; 
        SNARE01_BEATS[i] = 0; 
        HIHAT01_BEATS[i] = 0; 
        RIDE_BEATS[i] = 0; 
        BASS02_BEATS[i] = 0; 
        SNARE02_BEATS[i] = 0; 
        HIHAT02_BEATS[i] = 0; 
        CRASH_BEATS[i] = 0; 
    }
}

//Reset the sequencer
function Stop() {
    if(isPlaying) {
        console.debug("Stopping sequencer");        
        isPlaying = false;
        document.getElementById("playButton").style.backgroundColor="#a3a3a3";

        clearInterval(timer);
        timer = window.setInterval("Update()", TempoToMillis(tempo));  
        currentBeat = 0;
    }
}

function Play() {
    console.debug("Starting sequencer");
    isPlaying = true;
    document.getElementById("playButton").style.backgroundColor="green";
}

function Update() {
    //console.debug("Updating sequencer");

    if(isPlaying) {

        //Update sequencer UI for playing indicator
        for(var i = 0; i < MAX_BEATS; i++)
        {
            var sequencerButtonID = "sb" + i;
            if(i == currentBeat)
            {
                document.getElementById(sequencerButtonID).style.backgroundColor="green";
            }
            else
            {
                document.getElementById(sequencerButtonID).style.backgroundColor="#bbb";
            }
        }

        if(currentBeat >= MAX_BEATS - 1) //loop arounnd if we are at end of sequence
        {
            currentBeat = 0;
        }
        else
        {
            currentBeat++;
        }
        console.debug("Current beat: " + currentBeat);   
        
        //Play sounds that are stored in the arrays as 1 (on) or 0 (off).  
        //This could be improved to use a volume instead of o/1
        for(var i = 0; i < MAX_BEATS; i++) {
            if(BASS01_BEATS[i] == 1) {
                PlaySound(0);
            }
            if(SNARE01_BEATS[i] == 1) {
                PlaySound(1);
            }
            if(HIHAT01_BEATS[i] == 1) {
                PlaySound(2);
            }
            if(RIDE_BEATS[i] == 1) {
                PlaySound(3);
            }
            if(BASS02_BEATS[i] == 1) {
                PlaySound(4);
            }
            if(SNARE02_BEATS[i] == 1) {
                PlaySound(5);
            }
            if(HIHAT02_BEATS[i] == 1) {
                PlaySound(6);
            }
            if(CRASH_BEATS[i] == 1) {
                PlaySound(7);
            }
        }
    }
  }

  //Return the ms to delay based on the bpm provided
  function TempoToMillis(bpm){
    return 1000.0 / (tempo / 60.0);
  }