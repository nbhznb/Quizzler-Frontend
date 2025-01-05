// LoginResponseDto.jsx
export class LoginResponseDto {
    constructor(id, token, refreshToken) {
        this.Id = id;
        this.Token = token;
        this.RefreshToken = refreshToken;
    }
}
