# Backend Review

Build apis [8]:

- signUp [2]
- signIn [2]
- getUserById [1]
- updateUserInformation [3]

Unit test [2]

## signUp UseCase

- As a user, I can sign up with these properties:

```
- email
- password
- username
- phoneNumber (optional)
```

### Acceptance criteria:

```
1. SignUp wih required properties:

- If the request miss one of required property, we should return the status code 400 with message 'Missing ${property}'

2. Email should be valid

- If the value doesn't have '@', we should return the status code 400 with message 'Email is invalid'

3. Password:

- At least 8 characters
- At least one number
- At least one special character
- At least one lowercase

Example: 'P@ssw0rd'

- If the value doesn't match the rule, we should return the status code 400 with message 'Password is invalid'.

4. Username should be valid
- Min length: 10
- Max length: 50
- No special character

5. PhoneNumber (if the request has phoneNumber, phoneNumber should be valid)

- Only number character

6. Only existed one user account

- If user has already signed up, we should return the status code 400 with message 'User is existed"

7. Return the success response
{
  message: 'SignUp Successfully'
}
```

## signIn useCase

- As a user, I can signIn with 'email' and 'password'

### Acceptance criteria:

```
1. SignIn with required properties

- If the request miss one of required property, we should return the status code 400 with message 'Missing ${property}'

2. User is not existed
- If user is not existed, we should return the status code 404 with message 'User is not existed'

3. Password is incorrect
- If the password is incorrect, we should return status code 400 with message 'Password is incorrect'

4. Return the success response
{
  "accessToken": "",
  "idToken: "",
}
```

## getUserById useCase

- As a user, I can get user's information by userId

[x] Token is required

### Acceptant criteria

```
1. User is not existed

- If user is not existed, we should return the status code 404 with message 'User is not existed'

2. Return the success response
{
  "id": "",
  "email: "",
  "username: "",
  "phoneNumber": "" (optional)
}
```

## update user's information useCase

- As a user, I can update user's information

[x] Token is required

### Acceptant criteria

```
1. I can update with these properties:
- username
- phoneNumber

2. Return the success response
{
  message: 'Update successfully'
}
```

## Notes:

- Should use typescript
- Use any frameworks which support the 'express'
- Cover the unit test for 'signInUseCase' and 'updateUserInformationUseCase'
- Don't copy code from another one
