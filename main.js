// main.js
import * as THREE from "three";

document.addEventListener("DOMContentLoaded", () => {
    // 1. Scene, cube
    const scene = new THREE.Scene();
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: "#0000FF" });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 0, -2);
    cube.rotation.set(0, Math.PI / 4, 0);
    scene.add(cube);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(1, 1, 5);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = "absolute";

    // 4. Video stream
    const video = document.createElement("video");
    video.style.position = "absolute";
    video.width = renderer.domElement.width;
    video.height = renderer.domElement.height;

    navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
            return video.play();
        })
        .catch((err) => console.error("getUserMedia error:", err));

    // 5. Append in order: video below, canvas above
    document.body.appendChild(video);
    document.body.appendChild(renderer.domElement);

    // 6. Initialize AR engine (placeholder)
    const ar = new SOME_AR_ENGINE({ /* options */ });

    // Helper for next frame
    function nextVideoFrameReady() {
        return new Promise((resolve) => requestAnimationFrame(resolve));
    }

    // 7. AR update loop: update camera pose & render
    (async () => {
        while (true) {
            await nextVideoFrameReady();
            const { position, rotation } = ar.computeCameraPose(video);
            camera.position.copy(position);
            camera.rotation.set(rotation.x, rotation.y, rotation.z);
            renderer.render(scene, camera);
        }
    })();
});
