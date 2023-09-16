# Audio Player README

## Description

This audio player is a simple web application designed for playing music. It provides controls for managing the playback of music tracks, displays information about the current track, and allows you to select tracks from a playlist.

## Usage Instructions

1. **Running the Application:**

   Open the `index.html` file in a web browser to launch the audio player.

2. **User Interface:**

   - **Track Title and Artist:** At the top of the player, information about the current track is displayed, including the song title and artist.

   - **Playback Controls:** At the bottom, there are playback control buttons:
     - **Repeat:** Enables or disables the repeat playback of the current track.
     - **Previous Track:** Switches to the previous track in the playlist.
     - **Play/Pause:** Plays or pauses the current track.
     - **Next Track:** Switches to the next track in the playlist.
     - **Volume Control:** Allows you to increase or decrease the volume.
     - **Seekbar:** Lets you scrub through the track by dragging the slider.

   - **Playlist:** On the left, there's a list of available tracks with information about each track, including cover art, title, artist, duration, and genre. To play a track, click the play button (represented by the "Play" icon) next to the track.

   - **Track Information:** At the bottom of the player, the current playback time and the total duration of the track are displayed.

3. **Volume Control:**

   - Use the volume control slider to adjust the volume level.

4. **Seeking Through the Track:**

   - To seek through the track, use the seekbar slider. You can drag the slider to navigate to different parts of the track.

5. **Repeat Playback:**

   - To enable repeat playback of the current track, press the repeat button (represented by the "Repeat" icon). Press it again to disable repeat.

6. **Changing Tracks:**

   - Use the "Previous Track" and "Next Track" buttons to switch between tracks in the playlist.

## Customization

- You can customize this audio player by adding your own music tracks and cover images. To do this, replace the files in the `images` folder and specify the appropriate paths and track information in the HTML code.

- The user interface and styles can be customized through the `style.css` file, and functionality can be extended using JavaScript in the `main.js` file.
