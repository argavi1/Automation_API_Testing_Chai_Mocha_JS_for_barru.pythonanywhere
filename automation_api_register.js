const request_url = require("supertest")("http://barru.pythonanywhere.com");
const assert = require("chai").expect;

describe("Test POST /REGISTER", function () { // FUNCTION DECLARATION THAT WILL BE TESTED
  it("1.Verify Success Register", async function () { // TEST CASE
    let random_email = Math.random().toString(36).substring(7); // MAKING A RANDOM DATA

    const response = await request_url // FOR DIRECTING INTO URL barru.pythonanywhere.com
      .post("/register")
      .send({ email: random_email + "@gmail.com", password: random_email, name: random_email }); // CORRESPONDING WITH BODY

    const hasil_response = response.body; // CONTAINING THE RESULT OF API HITTING; ADA DATA, MESSAGE, STATUS

    assert(response.body.status).to.eql('SUCCESS_REGISTER');
    assert(response.body.data).to.eql('berhasil');
    assert(response.body.message).to.eql('created user!');
    assert(hasil_response).to.include.keys("data", "message", "status"); 
  });

  it("2.Verify Success Register with Additional IP Address in Body", async function () {
    let random_text = Math.random().toString(36).substring(7);
    const response = await request_url
      .post("/register")
      .send({ email: random_text + "@gmail.com", password: random_text, name: random_text, ip_address: "127.0.0.1" });

    const hasil_response = response.body;
    assert(response.body.status).to.eql('SUCCESS_REGISTER');
    assert(response.body.data).to.eql('berhasil');
    assert(response.body.message).to.eql('created user!');
    assert(hasil_response).to.include.keys("data", "message", "status"); 
  });

  it("3.Verify Success Register with Additional Params", async function () {
    let random_text = Math.random().toString(36).substring(7);
    const response = await request_url
      .post("/register?email=lalala&password=hahhaha")
      .send({ email: random_text + "@gmail.com", password: random_text, name: random_text, ip_address: "127.0.0.1" });

    const hasil_response = response.body;
    assert(response.body.status).to.eql('SUCCESS_REGISTER');
    assert(response.body.data).to.eql('berhasil');
    assert(response.body.message).to.eql('created user!');
    assert(hasil_response).to.include.keys("data", "message", "status"); 
  });

  it("4.Verify Success Register with Random Authorization", async function () {
    let random_text = Math.random().toString(36).substring(7);
    const response = await request_url
      .post("/register")
      .set({ Authorization: `Bearer asjdhgagduahuidghaiduawgdiuwaghsgjhagdjhgdshjsgd` })
      .send({ email: random_text + "@gmail.com", password: random_text, name: random_text});

    const hasil_response = response.body;
    assert(response.body.status).to.eql('SUCCESS_REGISTER');
    assert(response.body.data).to.eql('berhasil');
    assert(response.body.message).to.eql('created user!');
    assert(hasil_response).to.include.keys("data", "message", "status"); 
  });

  it("5.Verify Success Register with Random Authorization and Params", async function () {
    let random_text = Math.random().toString(36).substring(7);
    const response = await request_url
      .post("/register?email=bahahahaahaha@gmail.com&password=waluyo")
      .set({ Authorization: `Bearer asjdhgagduahuidghaiduawgdiuwaghsgjhagdjhgdshjsgd` })
      .send({ email: random_text + "@gmail.com", password: random_text, name: random_text});

    const hasil_response = response.body;
    assert(response.body.status).to.eql('SUCCESS_REGISTER');
    assert(response.body.data).to.eql('berhasil');
    assert(response.body.message).to.eql('created user!');
    assert(hasil_response).to.include.keys("data", "message", "status"); 
  });

  it("6.Verify Failed Register with Empty Body, Only Dictionary", async function () {
    let random_pass = Math.random().toString(36).substring(7);
    const response = await request_url
      .post("/register")
      .send({ });
    const hasil_response = response.body;
    assert(response.status).to.eql(500);
  });

  it("7.Verify Failed Register with Empty Password", async function () {
    let random_email = Math.random().toString(36).substring(7);
    const response = await request_url
      .post("/register")
      .send({ email: random_email + "@gmail.com", password: "", name: random_email });
    const hasil_response = response.body;
    assert(response.body.status).to.eql('FAILED_REGISTER');
    assert(response.body.data).to.eql('Email/Username/Password tidak boleh kosong');
    assert(hasil_response).to.include.keys("data", "message", "status"); 
  });

  it("8.Verify Failed Register with Empty Email", async function () {
    let random_email = Math.random().toString(36).substring(7);
    const response = await request_url
      .post("/register")
      .send({ email: "", password: "testerjago", name: random_email });
    const hasil_response = response.body;
    assert(response.body.status).to.eql('FAILED_REGISTER');
    assert(response.body.data).to.eql('Email/Username/Password tidak boleh kosong');
    assert(hasil_response).to.include.keys("data", "message", "status"); 
  });

  it("9.Verify Failed Register with Empty Name", async function () {
    let random_email = Math.random().toString(36).substring(7);
    const response = await request_url
      .post("/register")
      .send({ email: random_email + "@gmail.com", password: "testerjago", name: "" });
    const hasil_response = response.body;
    assert(response.body.status).to.eql('FAILED_REGISTER');
    assert(response.body.data).to.eql('Email/Username/Password tidak boleh kosong');
    assert(hasil_response).to.include.keys("data", "message", "status"); 
  });

  it("10.Verify Failed Register with Symbol in Name Field", async function () {
    let random_email = Math.random().toString(36).substring(7);
    const response = await request_url
      .post("/register")
      .send({ email: random_email + "@gmail.com", password: "testerjago", name: random_email + "&#" });
    const hasil_response = response.body;
    assert(response.body.status).to.eql('FAILED_REGISTER');
    assert(response.body.data).to.eql('Nama atau password tidak valid');
    assert(hasil_response).to.include.keys("data", "message", "status"); 
  });

  it("11.Verify Failed Register with Symbol in Email Field", async function () {
    let random_email = Math.random().toString(36).substring(7);
    const response = await request_url
      .post("/register")
      .send({ email: "#$$$$$", password: "testerjago", name: random_email });
    const hasil_response = response.body;
    assert(response.body.status).to.eql('FAILED_REGISTER');
    assert(hasil_response).to.include.keys("data", "message", "status"); 
  });

  it("12.Verify Failed Register with SQLI in Password Field", async function () {
    let random_email = Math.random().toString(36).substring(7);
    const response = await request_url
      .post("/register")
      .send({ email: random_email + "@gmail.com", password: "SELECT", name: random_email });
    const hasil_response = response.body;
    assert(response.body.status).to.eql('FAILED_REGISTER');
    assert(response.body.data).to.eql('Nama atau password tidak valid');
    assert(hasil_response).to.include.keys("data", "message", "status"); 
  });

  it("13.Verify Failed Register with SQLI in Email Field", async function () {
    let random_email = Math.random().toString(36).substring(7);
    const response = await request_url
      .post("/register")
      .send({ email: "tes') or ('a'='a", password: "gavigavi", name: random_email });
    const hasil_response = response.body;
    assert(response.body.status).to.eql('FAILED_REGISTER');
    assert(hasil_response).to.include.keys("data", "message", "status"); 
  });

  it("14.Verify Failed Register with SQLI in Name Field", async function () {
    let random_email = Math.random().toString(36).substring(7);
    const response = await request_url
      .post("/register")
      .send({ email: random_email + "@gmail.com", password: "testerjago", 
              name: "tes') or ('a'='a'" });
    const hasil_response = response.body;
    assert(response.body.status).to.eql('FAILED_REGISTER');
    assert(hasil_response).to.include.keys("data", "message", "status"); 
  });

  it("15.Verify Failed Register with Body Email Only", async function () {
    let random_email = Math.random().toString(36).substring(7);
    const response = await request_url
      .post("/register")
      .send({ email: random_email + "@gmail.com" });

    assert(response.status).to.eql(500);
  });

  it("16.Verify Failed Register with Body Name Only", async function () {
    let random_name = Math.random().toString(36).substring(7);
    const response = await request_url
      .post("/register")
      .send({ name: random_name});

    assert(response.status).to.eql(500);
  });

  it("17.Verify Failed Register with Body Password Only", async function () {
    let random_pass = Math.random().toString(36).substring(7);
    const response = await request_url
      .post("/register")
      .send({ password: random_pass});

    assert(response.status).to.eql(500);
  });

  it("18.Verify Failed Register with Max Char in Email Field", async function () {
    let random_email = Array.from(Array(55), () => Math.floor(Math.random() * 36).toString(36)).join('');
    let random_pass = Array.from(Array(11), () => Math.floor(Math.random() * 36).toString(36)).join('');
    const response = await request_url
      .post("/register")
      .send({ email: random_email + "@gmail.com", password: random_pass, name: random_email });
    const hasil_response = response.body;
    assert(response.body.status).to.eql('FAILED_REGISTER');
    assert(response.body.data).to.eql('Email/Username/Password melebihin maksimal karakter');
    assert(hasil_response).to.include.keys("data", "message", "status"); 
  });

  it("19.Verify Failed Register with Max Char in Password Field", async function () {
    let random_email = Array.from(Array(10), () => Math.floor(Math.random() * 36).toString(36)).join('');
    let random_pass = Array.from(Array(38), () => Math.floor(Math.random() * 36).toString(36)).join('');
    const response = await request_url
      .post("/register")
      .send({ email: random_email + "@gmail.com", password: random_pass, name: random_email });
    const hasil_response = response.body;
    assert(response.body.status).to.eql('FAILED_REGISTER');
    assert(response.body.data).to.eql('Email/Username/Password melebihin maksimal karakter');
    assert(hasil_response).to.include.keys("data", "message", "status"); 
  });

  it("20.Verify Failed Register without Body", async function () {
    let random_pass = Math.random().toString(36).substring(7);
    const response = await request_url
      .post("/register")

    assert(response.status).to.eql(500);
  });

  it("21.Verify Failed Register with Method GET", async function () {
    let random_text = Math.random().toString(36).substring(7);
    const response = await request_url
      .get("/register")
      .send({ email: random_text + "@gmail.com", password: random_text, name: random_text, ip_address: "127.0.0.1" });

    assert(response.status).to.eql(405);
  });

  it("22.Verify Failed Register with Method PUT", async function () {
    let random_text = Math.random().toString(36).substring(7);
    const response = await request_url
      .put("/register")
      .send({ email: random_text + "@gmail.com", password: random_text, name: random_text, ip_address: "127.0.0.1" });


    assert(response.status).to.eql(405);
  });

  it("23.Verify Failed Register with Method PATCH", async function () {
    let random_text = Math.random().toString(36).substring(7);
    const response = await request_url
      .patch("/register")
      .send({ email: random_text + "@gmail.com", password: random_text, name: random_text, ip_address: "127.0.0.1" });


    assert(response.status).to.eql(405);
  });

  it("24.Verify Failed Register with Form-Data as Body", async function () {
    let random_text = Math.random().toString(36).substring(7);
    const response = await request_url
      .post("/register")
      .type('form')
      .send({ email: random_text + "@gmail.com", password: random_text, name: random_text});

    assert(response.status).to.eql(500);
  });

  it("25.Verify Failed Register with xx-www-form-urlencoded as Body", async function () {
    let random_text = Math.random().toString(36).substring(7);
    const response = await request_url
      .post("/register")
      .set('content-Type', 'application/x-www-form-urlencoded')
      .send({ email: random_text + "@gmail.com", password: random_text, name: random_text});

    assert(response.status).to.eql(500);
  });

  it("26.Verify Failed Register with Integer Type in Email", async function () {
    let random_text = Math.random().toString(36).substring(7);
    const response = await request_url
      .post("/register")
      .send({ email: 123456789, password: random_text, name: random_text});

    assert(response.status).to.eql(500);
  });

  it("27.Verify Failed Register with Integer Type in Name", async function () {
    let random_text = Math.random().toString(36).substring(7);
    const response = await request_url
      .post("/register")
      .send({ email: random_text + "@gmail.com", password: random_text, name: 123456789});

    assert(response.status).to.eql(500);
  });

  it("28.Verify Failed Register with Integer Type in Password", async function () {
    let random_text = Math.random().toString(36).substring(7);
    const response = await request_url
      .post("/register")
      .send({ email: random_text + "@gmail.com", password: 123456789, name: random_text});

    const hasil_response = response.body;
    assert(response.status).to.eql(500);
  });

  it("29.Verify Failed Register with Integer Type in Email Start with 0", async function () {
    let random_text = Math.random().toString(36).substring(7);
    const response = await request_url
      .post("/register")
      .send({ email: 08123456789, password: random_text, name: random_text});

    const hasil_response = response.body;
    assert(response.status).to.eql(500);
  });

  it("30.Verify Failed Register with Integer Type in Name Start with 0", async function () {
    let random_text = Math.random().toString(36).substring(7);
    const response = await request_url
      .post("/register")
      .send({ email: random_text + "@gmail.com", password: random_text, name: 08123456789});

    const hasil_response = response.body;
    assert(response.status).to.eql(500);
  });

  it("31.Verify Failed Register with Integer Type in Password Start with 0", async function () {
    let random_text = Math.random().toString(36).substring(7);
    const response = await request_url
      .post("/register")
      .send({ email: random_text + "@gmail.com", password: 08123456789, name: random_text});

    const hasil_response = response.body;
    assert(response.status).to.eql(500);
  });

  it("32.Verify Failed Register with Existing Registered Email Gmail", async function () {
    const response = await request_url
      .post("/register")
      .send({ email: "tester@gmail.com", password: "aditya.qa", name: "Test Email Gmail"});
    const hasil_response = response.body;
    assert(response.body.status).to.eql('FAILED_REGISTER');
    assert(response.body.data).to.eql('Email sudah terdaftar, gunakan Email lain');
    assert(hasil_response).to.include.keys("data", "message", "status"); 
  });

  it("33.Verify Failed Register with (.) in Existing Registered Email Gmail", async function () {
    const response = await request_url
      .post("/register")
      .send({ email: "tes.ter@gmail.com", password: "aditya.qa", name: "Test Email Gmail" });
    const hasil_response = response.body;
    assert(response.body.status).to.eql('FAILED_REGISTER');
    assert(response.body.data).to.eql('Email sudah terdaftar, gunakan Email lain');
    assert(hasil_response).to.include.keys("data", "message", "status"); 
  });

  it("34.Verify Failed Register without @ in Email Field", async function () {
    const response = await request_url
      .post("/register")
      .send({ email: "tes.testgmail.com", password: "aditya.qa", name: "Test Email Gmail" });
    const hasil_response = response.body;
    assert(response.body.status).to.eql('FAILED_REGISTER');
    assert(response.body.data).to.eql('Email tidak valid');
    assert(hasil_response).to.include.keys("data", "message", "status");
  });

    it("35.Verify Failed Register with @@ in Email Field", async function () {
      const response = await request_url
        .post("/register")
        .send({ email: "tes.test@@gmail.com", password: "aditya.qa", name: "Test Email Gmail" });
      const hasil_response = response.body;
      assert(response.body.status).to.eql('FAILED_REGISTER');
      assert(response.body.data).to.eql('Email tidak valid');
      assert(hasil_response).to.include.keys("data", "message", "status");
    });

  it("36.Verify Failed Register with @ in the beggining of Email Field", async function () {
    const response = await request_url
      .post("/register")
      .send({ email: "@tes.test@gmail.com", password: "aditya.qa", name: "Test Email Gmail" });
    const hasil_response = response.body;
    assert(response.body.status).to.eql('FAILED_REGISTER');
    assert(response.body.data).to.eql('Email tidak valid');
    assert(hasil_response).to.include.keys("data", "message", "status");
  });

    it("37.Verify Failed Register without .com in Email Field", async function () {
      const response = await request_url
        .post("/register")
        .send({ email: "tes.test@gmail", password: "aditya.qa", name: "Test Email Gmail" });
      const hasil_response = response.body;
      assert(response.body.status).to.eql('FAILED_REGISTER');
      assert(response.body.data).to.eql('Email tidak valid');
      assert(hasil_response).to.include.keys("data", "message", "status");
    });

    it("38.Verify Failed Register with ,com in Email Field", async function () {
      const response = await request_url
        .post("/register")
        .send({ email: "tes.test@gmail,com", password: "aditya.qa", name: "Test Email Gmail" });
      const hasil_response = response.body;
      assert(response.body.status).to.eql('FAILED_REGISTER');
      assert(response.body.data).to.eql('Email tidak valid');
      assert(hasil_response).to.include.keys("data", "message", "status");
  });
});