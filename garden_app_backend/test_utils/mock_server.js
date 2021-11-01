const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const PORT = process.argv[2];

const data = {
    valve1: 1, // 1 = OFF
    valve2: 1,
}

const temperatures = {
    sensor1: {
        temperature: 25,
        humidity: 50,
    },
    sensor2: {
        temperature: 25,
        humidity: 33,
    },
};

app.listen(PORT, () => {
    console.log(`Mock server is listening on port ${PORT}`);
});

app.get('/valves', (req, res) => {
    res.send(data);
});

app.post('/valves', (req, res) => {
    const valve = req.body.valve
    const state = req.body.state
    const timer = req.body.timer;

    console.log(`requested state ${state} with timer of ${timer} for valve ${valve}`);
    data[valve] = state;
    setTimer(valve, timer);
    res.send({ data });
})

app.get('/temperatures', (req, res) => {
    res.send({ temperatures });
})

const setTimer = (valve, timer) => {
    setTimeout(() => {
        data[valve] = !data[valve]
    }, timer);
}

