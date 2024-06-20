(async function () {
  const videoDevices = await navigator.mediaDevices.enumerateDevices()
    .then(devices => devices.filter(device => device.kind === 'videoinput'));

  const select = document.createElement('select');

  videoDevices.forEach(device => {
    const option = document.createElement('option');
    option.value = device.deviceId;
    option.text = device.label;
    select.appendChild(option);
  })

  select.value = videoDevices.find(device => device.label.includes('OBS')).deviceId || videoDevices[0].deviceId;

  const startBtn = document.createElement('button');
  startBtn.textContent = 'Start';

  startBtn.onclick = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        deviceId: select.value,
      },
    });

    const video = document.createElement('video');
    video.srcObject = stream;
    video.play();
    document.body.appendChild(video);
  }

  document.body.appendChild(select);
  document.body.appendChild(startBtn);
})()