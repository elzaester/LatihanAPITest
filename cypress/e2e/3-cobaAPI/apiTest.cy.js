describe('Reqres API Testing', () => {

  const baseUrl = 'https://reqres.in/api';

  it('GET List Users', () => {
    cy.request(`${baseUrl}/users?page=2`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.have.length.greaterThan(0);
    });
  });

  it('GET Single User - Not Found (ID 23)', () => {
  cy.request({
    method: 'GET',
    url: 'https://reqres.in/api/users/23',
    headers: {
    'x-api-key': 'reqres-free-v1'
  },
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.eq(404);
  });
  
});


  it('GET Single User - Not Found', () => {
    cy.request({
      url: `${baseUrl}/users/23`,
      headers: {
        'x-api-key': 'reqres-free-v1'
        },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it('POST Create User', () => {
  cy.request({
    method: 'POST',
    url: `${baseUrl}/users`,
    headers: {
        'x-api-key': 'reqres-free-v1'
        },
    body: {
      name: 'morpheus',
      job: 'leader'
    }
  }).then((response) => {
    expect(response.status).to.eq(201);
    expect(response.body).to.have.property('name', 'morpheus');
  });
});


  it('PUT Update User', () => {
  cy.request({
    method: 'PUT',
    url: `${baseUrl}/users/2`,
    headers: {
        'x-api-key': 'reqres-free-v1'
        },
    body: {
      name: 'morpheus',
      job: 'zion resident'
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
  });
});


  it('PATCH Update User', () => {
  cy.request({
    method: 'PATCH',
    url: `${baseUrl}/users/2`,
    headers: {
        'x-api-key': 'reqres-free-v1'
        },
    body: {
      name: 'neo'
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.name).to.eq('neo');
  });
});


  it('DELETE User', () => {
  cy.request({
    method: 'DELETE',
    url: `${baseUrl}/users/2`,
    headers: {
        'x-api-key': 'reqres-free-v1'
        },
  }).then((response) => {
    expect(response.status).to.eq(204); 
  });
});


  it('POST Register - Success', () => {
    cy.request({
        method: 'POST',
        url: 'https://reqres.in/api/register',
        headers: {
        'x-api-key': 'reqres-free-v1'
        },
        body: {
        email: 'eve.holt@reqres.in',
        password: 'pistol'
        }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('token');
    });
  });

  it('POST Register - Fail', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/register`,
      headers: {
        'x-api-key': 'reqres-free-v1'
        },
      failOnStatusCode: false,
      body: {
        email: 'sydney@fife'
      }
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('error');
    });
  });

  it('POST Login - Success', () => {
  cy.request({
    method: 'POST',
    url: `${baseUrl}/login`,
    headers: {
        'x-api-key': 'reqres-free-v1'
        },
    body: {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka'
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('token');
  });
});


  it('POST Login - Fail', () => {
  cy.request({
    method: 'POST',
    url: `${baseUrl}/login`,
    headers: {
        'x-api-key': 'reqres-free-v1'
        },
    body: {
      email: 'peter@klaven'
    },
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.eq(400);
    expect(response.body.error).to.eq('Missing password');
  });
});

});
