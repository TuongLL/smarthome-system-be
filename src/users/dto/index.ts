import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UserRegisterDto {
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;
}

export class UserLoginDto {
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}

export class UserActiveDto {
    @IsNotEmpty()
    token: string
}

export class UserUpdateDto {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsString()
    @IsOptional()
    firstName?: string;

    @IsString()
    @IsOptional()
    lastName?: string;

    @IsString()
    @IsOptional()
    phoneNumber?: string;
}
