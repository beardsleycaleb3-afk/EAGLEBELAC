# EAGLEBELAC

A browser-based audio visualizer.  
Five tracks, one glowing sphere, some orbiting ghosts, and a frame that changes color like it knows something you don’t.

## What happens when you use it

Click a button → music starts (or restarts if you click the same one again).  
The central sphere pulses and drifts gently to the beat.  
Faint orbiting orbs circle it, now a little less transparent after feedback.  
The border glows in a different neon shade for each track.  
Bottom bars bounce to bass, mids, and highs like quiet spectators.

That’s the whole experience. No settings, no login, no explanations. Just press and stare.

## How to run it

Don’t double-click the file directly—browsers tend to hide the backgrounds when you do that.  
Instead, serve it locally:

```bash
python -m http.server 8000

# EAGLEBELAC
