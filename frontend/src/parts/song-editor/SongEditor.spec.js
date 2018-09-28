import * as actions from './SongEditorActions';


describe('modulateContent', () => {

  const content = "one [C]two\n[..D]three four";
  const contentUpSharp = "one [C#]two\n[..D#]three four";
  const contentUpFlat = "one [Db]two\n[..Eb]three four";
  const contentDownSharp = "one [B]two\n[..C#]three four";
  const contentDownFlat = "one [B]two\n[..Db]three four";
  const contentNoChords = "one two three Aminor ]#1j3k a;"

  it('should modulate asc', () => {
    const test = actions.modulateContent(content, "#", "asc");
    const test2 = actions.modulateContent(content, "b", "asc");
    expect(test).toEqual(contentUpSharp);
    expect(test2).toEqual(contentUpFlat);
  });

  it('should modulate desc', () => {
    const test = actions.modulateContent(content, "#", "desc");
    const test2 = actions.modulateContent(content, "b", "desc");
    expect(test).toEqual(contentDownSharp);
    expect(test2).toEqual(contentDownFlat);
  });

  it('should not change content with no chords', () => {
    const test = actions.modulateContent(contentNoChords, "#", "asc");
    expect(test).toEqual(contentNoChords);
  });

});

describe('modulateChordChunk', () => {

  it('should handle spaces and chords', () => {
    const cc = "..Am.C..";
    const test = actions.modulateChordChunk(cc, "#", "asc");
    const test2 = actions.modulateChordChunk(cc, "b", "desc");
    expect(test).toEqual("..A#m.C#..");
    expect(test2).toEqual("..Abm.B..");
  });

  it('should handle one chord', () => {
    const cc = "C#min7";
    const test = actions.modulateChordChunk(cc, "b", "asc");
    expect(test).toEqual("Dmin7");
  });

  it('should handle no chords', () => {
    const test = actions.modulateChordChunk("..");
    expect(test).toEqual("..");
  });

});

describe('splitChordChunk', () => {

  it('should handle spaces and chords', () => {
    const test = actions.splitChordChunk("..Am.C...");
    expect(test).toEqual(["..", "Am", ".", "C", "..."]);
  });

  it('should handle one chord', () => {
    const test = actions.splitChordChunk("Bdim");
    expect(test).toEqual(["Bdim"]);
  });

  it('should handle no chords', () => {
    const test = actions.splitChordChunk("..");
    expect(test).toEqual([".."]);
  });

});

describe('findNextChord', () => {

  it('should find chord', () => {
    const test = actions.findNextChord("CMajor", "#", "asc");
    const test2 = actions.findNextChord("BbMajor", "#", "asc");
    const test3 = actions.findNextChord("Abdim", "b", "desc");
    expect(test).toEqual("C#Major");
    expect(test2).toEqual("BMajor");
    expect(test3).toEqual("Gdim");
  });

  it('should not change chord if no recognized note', () => {
    const test = actions.findNextChord("XMajor", "#", "asc");
    expect(test).toEqual("XMajor");
  });

});

describe('parseChord', () => {

  it('should find natural note', () => {
    const test = actions.parseChord("AMajor");
    expect(test).toEqual({
      note: "A",
      type: "Major"
    });
  });

  it('should find sharp note', () => {
    const test = actions.parseChord("C#minor");
    expect(test).toEqual({
      note: "C#",
      type: "minor"
    });
  });

  it('should find flat note', () => {
    const test = actions.parseChord("BbDim");
    expect(test).toEqual({
      note: "Bb",
      type: "Dim"
    });
  });

  it('should return empty note if no note found', () => {
    const test = actions.parseChord("blargh");
    expect(test).toEqual({
      note: "",
      type: "blargh"
    });
  });

});

describe('findNextNote', () => {

  it('should find next note in sharp mode asc', () => {
    const test = actions.findNextNote("C#", "#", "asc");
    const test2 = actions.findNextNote("Bb", "#", "asc");
    expect(test).toEqual("D");
    expect(test2).toEqual("B");
  });

  it('should find next note in flat mode asc', () => {
    const test = actions.findNextNote("C", "b", "asc");
    const test2 = actions.findNextNote("C#", "b", "asc");
    expect(test).toEqual("Db");
    expect(test2).toEqual("D");
  });

  it('should wrap if on last note in sharp mode asc', () => {
    const test = actions.findNextNote("G#", "#", "asc");
    const test2 = actions.findNextNote("Ab", "#", "asc");
    expect(test).toEqual("A");
    expect(test2).toEqual("A");
  });

  it('should wrap if on last note in flat mode asc', () => {
    const test = actions.findNextNote("G#", "b", "asc");
    const test2 = actions.findNextNote("Ab", "b", "asc");
    expect(test).toEqual("A");
    expect(test2).toEqual("A");
  });

  it('should find next note in sharp mode desc', () => {
    const test = actions.findNextNote("C#", "#", "desc");
    const test2 = actions.findNextNote("Bb", "#", "desc");
    expect(test).toEqual("C");
    expect(test2).toEqual("A");
  });

  it('should find next note in flat mode desc', () => {
    const test = actions.findNextNote("C", "b", "desc");
    const test2 = actions.findNextNote("C#", "b", "desc");
    expect(test).toEqual("B");
    expect(test2).toEqual("C");
  });

  it('should wrap if on first note in sharp mode desc', () => {
    const test = actions.findNextNote("A", "#", "desc");
    expect(test).toEqual("G#");
  });

  it('should wrap if on first note in flat mode desc', () => {
    const test = actions.findNextNote("A", "b", "desc");
    expect(test).toEqual("Ab");
  });

  it('should return non-note', () => {
    const nextNote = actions.findNextNote("blah");
    expect(nextNote).toEqual("blah");
  });

});