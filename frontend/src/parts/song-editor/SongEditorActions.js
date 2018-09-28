import axios from 'axios';
import { addFlashMessage } from '../flash-message/FlashMessageActions';


export function updateSong(sId, data) {
  return dispatch => {
    return axios.put('/api/songs/' + sId + '/', data)
      .then(response => {
        dispatch(addFlashMessage({
          type: 'success',
          text: 'Saved successfully.'
        }));
      });
  }
}

export function modulateContent(content, mode, dir) {
  let newContent = content;
  const re = /\[(.*?)\]/g;
  const chordChunks = content.match(re);
  if (chordChunks) {
    const newChunks = chordChunks.map(chordChunk => {
      const stripped = chordChunk.substr(1, chordChunk.length - 2);
      const modulated = modulateChordChunk(stripped, mode, dir);
      return "[" + modulated + "]";
    });

    for (let i = 0; i < chordChunks.length; i++) {
      newContent = newContent.replace(chordChunks[i], newChunks[i]);
    }
  }

  return newContent;
}

// "    BbMajor C" -> "    CMajor C#"
export function modulateChordChunk(chordChunk, mode, dir) {
  const splitChunk = splitChordChunk(chordChunk);
  const newChunk = splitChunk.map(seg => (
    findNextChord(seg, mode, dir)
  ));
  return newChunk.join('');
}

// "    BbMajor C" -> ["    ", "BbMajor", " ", "C"]
export function splitChordChunk(chordChunk) {
  const splitChunk = [];
  const segment = [];
  for (let i = 0; i < chordChunk.length; i++) {
    const c = chordChunk[i];
    if (segment.length === 0) { segment.push(c); }
    else {
      if (c === '.') {
        if (segment[segment.length - 1] === '.') {
          segment.push(c);
        } else {
          splitChunk.push(segment.join(''));
          segment.length = 0;
          segment.push(c);
        }
      } else {
        if (segment[segment.length - 1] !== '.') {
          segment.push(c);
        } else {
          splitChunk.push(segment.join(''));
          segment.length = 0;
          segment.push(c);
        }
      }
    }
  }
  if (segment.length > 0) {
    splitChunk.push(segment.join(''));
  }
  return splitChunk;
}

// "BbMajor" -> "{ note: "Bb", type: "Major" }
export function parseChord(chord) {
  const parsed = {
    note: "",
    type: chord
  }
  if (chord.length > 0) {
    const rx = /[A-G]/;
    if (rx.test(chord[0])) {
      if ((chord.length > 1) && (chord[1] === "b" || chord[1] === "#")){
        parsed.note = chord.substr(0, 2);
        parsed.type = chord.substr(2, chord.length);
      } else {
        parsed.note = chord[0];
        parsed.type = chord.substr(1, chord.length);
      }
    }
  }
  return parsed;
}

export function findNextNote(note, mode, dir) {
  const notesSharp = [
    "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"
  ];
  const notesFlat = [
    "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab"
  ];
  
  const index = notesSharp.indexOf(note) !== -1
    ? notesSharp.indexOf(note)
    : notesFlat.indexOf(note);

  if (index !== -1) {
    const l = notesSharp.length;
    if (mode === "#") {
      if (dir === "asc") {
        return index < l - 1 ? notesSharp[index + 1] : notesSharp[0];
      } else if (dir === "desc") {
        return index > 0 ? notesSharp[index - 1] : notesSharp[l - 1];
      }
    } else if (mode === "b") {
      if (dir === "asc") {
        return index < l - 1 ? notesFlat[index + 1] : notesFlat[0];
      } else if (dir === "desc") {
        return index > 0 ? notesFlat[index - 1] : notesFlat[l - 1];
      }
    }
  } else {
    return note;
  }
}

// "BbMajor -> CMajor"
export function findNextChord(chord, mode, dir) {
  const { note, type } = parseChord(chord);
  const nextNote = findNextNote(note, mode, dir);
  return nextNote + type;
}