const request_url = require("supertest")("http://barru.pythonanywhere.com");
const assert = require("chai").expect;

let authorize_value = ""; //global authorization with empty value

describe("POST /login to get a valid authorization value", function () {
    it("1.Verify Success Login First", async function () { 
    const response = await request_url
        .post("/login")
        .send({ email: "testerjago@gmail.com", password: "sman60jakarta" });

        authorize_value = response.body.credentials.access_token; //update empty authorization with valid value
    });
});

describe("POST /update-profile", function () {
    it("2.Verify Success Update Username", async function () { 
        const response = await request_url 
            .put("/update-profile")
            .set({ Authorization: authorize_value })
            .send({ name: "sitampan tester"});

        const isi_data = response.body;

        assert(response.body.status).to.eql('SUCCESS_UPDATE_PROFILE');
        assert(response.body.message).to.eql('Berhasil Perbarui Profile');
        assert(isi_data).to.include.keys("data", "message", "status"); 
    });

    it("3.Verify Success Update Username with Additional Data", async function () { 
        const response = await request_url 
            .put("/update-profile")
            .set({ Authorization: authorize_value })
            .send({ name: "sitampan nyoba", email: "email.ngga.berubah@gmail.com"});

        const isi_data = response.body;

        assert(response.body.status).to.eql('SUCCESS_UPDATE_PROFILE');
        assert(response.body.message).to.eql('Berhasil Perbarui Profile');
        assert(isi_data).to.include.keys("data", "message", "status"); 
    });

    it("4.Verify Success Update Username with Space", async function () { 
        const response = await request_url 
            .put("/update-profile")
            .set({ Authorization: authorize_value })
            .send({ name: "  siganteng  "});

        const isi_data = response.body;

        assert(response.body.status).to.eql('SUCCESS_UPDATE_PROFILE');
        assert(response.body.message).to.eql('Berhasil Perbarui Profile');
        assert(isi_data).to.include.keys("data", "message", "status"); 
    });

    it("5.Verify Failed Update Username without Authorization", async function () { 
        const response = await request_url 
            .put("/update-profile")
            .send({ name: "sitampan beraksi"});

        assert(response.status).to.eql(500); 
    });

    it("6.Verify Failed Update Username with Symbol", async function () { 
        const response = await request_url 
            .put("/update-profile")
            .set({ Authorization: authorize_value })
            .send({ name: "sit@mpan*%"});

        const isi_data = response.body;

        assert(response.body.status).to.eql('FAILED_UPDATE_PROFILE');
        assert(response.body.message).to.eql('Tidak boleh mengandung symbol');
        assert(isi_data).to.include.keys("data", "message", "status"); 
    });

    it("7.Verify Failed Update Username with Empty String", async function () { 
        const response = await request_url 
            .put("/update-profile")
            .set({ Authorization: authorize_value })
            .send({ name: ""});

        const isi_data = response.body;

        assert(response.body.status).to.eql('FAILED_UPDATE_PROFILE');
        assert(response.body.data).to.eql('Username tidak boleh kosong');
        assert(response.body.message).to.eql('Gagal Update Profile');
        assert(isi_data).to.include.keys("data", "message", "status"); 
    });

    it("8.Verify Failed Update Username with Integer value", async function () { 
        const response = await request_url 
            .put("/update-profile")
            .set({ Authorization: authorize_value })
            .send({ name: 1});

        assert(response.status).to.eql(500); 
    });

    it("9.Verify Failed Update Username with Max Character", async function () {
        let max_name = Array.from(Array(30), () => Math.floor(Math.random() * 36).toString(36)).join(''); 
        const response = await request_url 
            .put("/update-profile")
            .set({ Authorization: authorize_value })
            .send({ name: max_name});

        const isi_data = response.body;

        assert(response.body.status).to.eql('FAILED_UPDATE_PROFILE');
        assert(response.body.data).to.eql('Username melebihin maksimal karakter');
        assert(isi_data).to.include.keys("data", "message", "status"); 
    });
    
    it("10.Verify Failed Update Username with Older Authorization", async function () { 
        const response = await request_url 
            .put("/update-profile")
            .set({ Authorization: 'd96f44863e92b8ec526622071bc00dcc8c020a9bde97f1112ed7c7ddc3d5a218' })
            .send({ name: "lholho"});

        const isi_data = response.body;

        assert(response.body.data).to.eql("User's not found");
        assert(response.body.message).to.eql('Credential is not valid');
        assert(isi_data).to.include.keys("data", "message", "status"); 
    });

    it("11.Verify Failed Update Username with Empty Authorization", async function () { 
        const response = await request_url 
            .put("/update-profile")
            .set({ Authorization: '' })
            .send({ name: "testing"});

        const isi_data = response.body;

        assert(response.body.data).to.eql("User's not found");
        assert(response.body.message).to.eql('Credential is not valid');
        assert(isi_data).to.include.keys("data", "message", "status"); 
    });

    it("12.Verify Failed Update Username with Bearer Authorization and valid value", async function () { 
        const response = await request_url 
            .put("/update-profile")
            .set({ Authorization: 'Bearer' + authorize_value  })
            .send({ name: "testing"});

        const isi_data = response.body;

        assert(response.body.data).to.eql("User's not found");
        assert(response.body.message).to.eql('Credential is not valid');
        assert(isi_data).to.include.keys("data", "message", "status"); 
    });

    it("13.Verify Failed Update Username with Bearer Authorization and wrong value", async function () { 
        const response = await request_url 
            .put("/update-profile")
            .set({ Authorization: 'Bearer ' + 'd96f44863e92b8ec526622071bc00dcc8c020a9bde97f1112ed7c7ddc3d5a218'  })
            .send({ name: "testing"});

        const isi_data = response.body;

        assert(response.body.data).to.eql("User's not found");
        assert(response.body.message).to.eql('Credential is not valid');
        assert(isi_data).to.include.keys("data", "message", "status"); 
    });

    it("14.Verify Failed Update Username with GET Request", async function () { 
        const response = await request_url 
            .get("/update-profile")
            .set({ Authorization: authorize_value })
            .send({ name: "sitampan beraksi"});

        assert(response.status).to.eql(405); 
    });

    it("15.Verify Failed Update Username with POST Request", async function () { 
        const response = await request_url 
            .post("/update-profile")
            .set({ Authorization: authorize_value })
            .send({ name: "sitampan beraksi"});

        assert(response.status).to.eql(405); 
    });

    it("16.Verify Failed Update Username with PATCH Request", async function () { 
        const response = await request_url 
            .patch("/update-profile")
            .set({ Authorization: authorize_value })
            .send({ name: "sitampan beraksi"});

        assert(response.status).to.eql(405); 
    });

    it("17.Verify Failed Update Username with empty body only dictionary", async function () { 
        const response = await request_url 
            .patch("/update-profile")
            .set({ Authorization: authorize_value })
            .send({});

        assert(response.status).to.eql(405); 
    });

    it("18.Verify Failed Update Username with xx-www-form-urlencoded as Body", async function () { 
        const response = await request_url 
            .put("/update-profile")
            .set('content-Type', 'application/x-www-form-urlencoded')
            .set({ Authorization: authorize_value })
            .send({ name: "hahaha hehe"});

        assert(response.status).to.eql(500); 
    });

    it("19.Verify Failed Update Username with Form-Data as Body", async function () { 
        const response = await request_url 
            .put("/update-profile")
            .type('form')
            .set({ Authorization: authorize_value })
            .send({ name: "sitampan hehe"});

        assert(response.status).to.eql(500); 
    });
});