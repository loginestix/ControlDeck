export const officialDesktopPlugins = [{
  slug: 'obs-studio',
  packageFile: 'latest.zip',
  manifest: {
    id: 'com.controldeck.obs-studio',
    name: 'OBS Studio',
    version: '1.0.0',
    author: 'ControlDeck',
    marketplace: {
      slug: 'obs-studio',
      category: 'Streaming',
      summary: 'Control OBS recording, scenes, audio, transitions, and studio tools.',
      verified: true,
      updatedAt: '2026-09-22',
    },
    permissions: ['network'],
    actions: [
      { id:'obs.record', name:'Record', description:'Start or stop recording.', icon:'Circle', type:'obs-record-toggle' },
      { id:'obs.record-pause', name:'Record Pause', description:'Pause or resume recording.', icon:'Pause', type:'obs-record-pause' },
      { id:'obs.chapter-marker', name:'Chapter Marker', description:'Create a recording chapter marker.', icon:'ListPlus', type:'obs-chapter-marker' },
      { id:'obs.stream', name:'Stream', description:'Start or stop streaming.', icon:'Radio', type:'obs-stream-toggle' },
      { id:'obs.virtual-camera', name:'Virtual Camera', description:'Start or stop the virtual camera.', icon:'Camera', type:'obs-virtual-camera-toggle' },
      { id:'obs.replay-buffer', name:'Replay Buffer', description:'Start or stop the replay buffer.', icon:'History', type:'obs-replay-buffer-toggle' },
      { id:'obs.replay-buffer-save', name:'Replay Buffer Save', description:'Save the current replay buffer.', icon:'Save', type:'obs-replay-buffer-save' },
      { id:'obs.scene', name:'Scene', description:'Switch the program scene.', icon:'Clapperboard', type:'obs-scene' },
      { id:'obs.source-visibility', name:'Source Visibility', description:'Show or hide an OBS source.', icon:'Eye', type:'obs-source-visibility' },
      { id:'obs.audio-mixer', name:'Audio Mixer', description:'Control source volume and mute.', icon:'AudioLines', type:'obs-audio-mixer' },
      { id:'obs.media-source', name:'Media Source Control', description:'Play or pause an OBS media source.', icon:'PlaySquare', type:'obs-media-source' },
      { id:'obs.studio-mode', name:'Studio Mode', description:'Toggle OBS Studio Mode.', icon:'PanelsTopLeft', type:'obs-studio-mode-toggle' },
      { id:'obs.transition', name:'Transition', description:'Trigger the configured transition.', icon:'ArrowLeftRight', type:'obs-transition' },
      { id:'obs.filter', name:'Filter', description:'Enable or disable an OBS filter.', icon:'Wand2', type:'obs-filter' },
      { id:'obs.screenshot', name:'Screenshot', description:'Capture an OBS source screenshot.', icon:'Camera', type:'obs-screenshot' },
    ],
  },
}];

export function findOfficialDesktopPlugin(idOrSlug){
  return officialDesktopPlugins.find(item=>item.slug===idOrSlug||item.manifest.id===idOrSlug)||null;
}
