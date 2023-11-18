import { ApiProperty } from '@nestjs/swagger';

export class VoiceRequestDto {
    @ApiProperty()
    Digits: string;
}

export class VoiceCallBackRequestDto {
    @ApiProperty()
    RecordingUrl?: string;

    @ApiProperty()
    Caller?: string;

    @ApiProperty()
    CallerCountry?: string;

    @ApiProperty()
    ErrorMessage?: string;
}