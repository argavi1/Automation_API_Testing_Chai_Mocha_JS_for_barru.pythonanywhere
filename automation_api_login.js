const request_url = require("supertest")("http://barru.pythonanywhere.com");
const assert = require("chai").expect;

describe("POST /login", function () { 
  it("1.Verify Success Login with valid email and password", async function () { 
    const response = await request_url 
      .post("/login") 
      .send({ email: "argavikoto1@gmail.com", password: "argavikoto" }); 

    const isi_data = response.body;

    assert(response.body.status).to.eql('SUCCESS_LOGIN');
    assert(response.body.message).to.eql('Anda Berhasil Login');
    assert(isi_data).to.include.keys("data", "message", "status"); 
  });

  it("2.Verify Failed Login with username and valid password", async function () { 
    const response = await request_url 
      .post("/login")
      .send({ email: "barrukurniawan", password: "sman60jakarta" });

    const isi_data = response.body;

    assert(response.body.status).to.eql('FAILED_LOGIN');
    assert(isi_data).to.include.keys("data", "message", "status"); 
  });

  it("3.Verify Failed Login with empty email and valid password", async function () { 
    const response = await request_url 
      .post("/login")
      .send({ email: "", password: "sman60jakarta" });

    const isi_data = response.body;

    assert(response.body.status).to.eql('FAILED_LOGIN');
    assert(isi_data).to.include.keys("data", "message", "status"); 
  });

  it("4.Verify Failed Login with empty password", async function () { 
    const response = await request_url 
      .post("/login")
      .send({ email: "gavi@gmail.com", password: "" });

    const isi_data = response.body;

    assert(response.body.status).to.eql('FAILED_LOGIN');
    assert(isi_data).to.include.keys("data", "message", "status"); 
  });

  it("5.Verify Failed Login with empty Body Only Dictionary", async function () { 
    const response = await request_url 
      .post("/login")
      .send({ });

      assert(response.status).to.eql(500);
  });

  it("6.Verify Failed Login with SQLI in password", async function () { 
    const response = await request_url
      .post("/login")
      .send({ email: "barru.kurniawan@gmail.com", 
              password: "SELECT%count%(*)%FROM%Users%WHERE%Username='jebol'%or%1=1%--%'%AND%Password=%'email'"});

    const isi_data = response.body;

    assert(response.body.status).to.eql('FAILED_LOGIN');
    assert(response.body.message).to.eql("Tidak boleh mengandung symbol");
    assert(isi_data).to.include.keys("data", "message", "status"); 
  });

  it("7.Verify Failed Login with SQLI in Email", async function () { 
    const response = await request_url
      .post("/login")
      .send({ email: "SELECT%count%(*)%FROM%Users%WHERE%Username='jebol'%or%1=1%--%'%AND%Password=%'email'", 
              password: "gavi 123"});

    const isi_data = response.body;

    assert(response.body.status).to.eql('FAILED_LOGIN');
    assert(response.body.message).to.eql("Cek kembali email anda");
    assert(isi_data).to.include.keys("data", "message", "status"); 
  });

  it("8.Verify Failed Login Email Doesnt Contain @", async function () { 
    const response = await request_url 
      .post("/login")
      .send({ email: "argavikotogmail.com", password: "argavikoto" });

    const isi_data = response.body;

    assert(response.body.status).to.eql('FAILED_LOGIN');
    assert(isi_data).to.include.keys("data", "message", "status");
  });

  it("9.Login Failed Email & Password Data Reversed", async function () { 
    const response = await request_url 
      .post("/login")
      .send({ email: "argavikoto", password: "argavikoto@gmail.com" });

    const isi_data = response.body;

    assert(response.body.status).to.eql('FAILED_LOGIN');
    assert(isi_data).to.include.keys("data", "message", "status");
  });

  it("10.Login Failed Email contain ,com", async function () { 
    const response = await request_url 
      .post("/login")
      .send({ email: "argavikoto@gmail,com", password: "argavikoto" });

    const isi_data = response.body;

    assert(response.body.status).to.eql('FAILED_LOGIN');
    assert(isi_data).to.include.keys("data", "message", "status"); 
  });
});