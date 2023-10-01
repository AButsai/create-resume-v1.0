import { EducationDto } from '@entities/education/dto/education.dto';
import { ProjectDto } from '@entities/project/dto/project.dto';
import { WorkDto } from '@entities/work/dto/work.dto';
import { ApiProperty } from '@nestjs/swagger';
import * as regex from '@utils/regex-expressions';
import {
  IsBoolean,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Matches,
  ValidateIf,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'Mark', description: 'User First name' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Павло', description: 'User First name' })
  @ValidateIf((object, value) => value !== undefined || value !== '')
  @IsString()
  firstName_ua: string;

  @ApiProperty({ example: 'Spencer', description: 'User Last name' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'Наливайко', description: 'User Last name' })
  @ValidateIf((object, value) => value !== undefined || value !== '')
  @IsString()
  lastName_ua: string;

  @ApiProperty({ example: '+380998887776', description: 'User contact phone' })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({ example: 'FrontEnd', description: 'Position user' })
  position: string;

  @ApiProperty({
    example: 'https://drive.google.com/drive/u/0/my-drive',
    description: 'Resume url',
    required: true,
  })
  @ValidateIf((object, value) => value !== undefined || value !== '')
  @Matches(regex.linkRegex, {
    message: 'This should have been a link',
  })
  resume: string;

  @ApiProperty({
    example: 'Beginner/Elementary(A1)',
    description: 'English level',
    required: true,
  })
  @ValidateIf((object, value) => value !== undefined || value !== '')
  @IsString()
  englishLevel: string;

  @ApiProperty({
    example: 'Native',
    description: 'Ukraine langue',
    required: true,
  })
  @ValidateIf((object, value) => value !== undefined || value !== '')
  @IsString()
  public ukraineLangue: string;

  @ApiProperty({
    example: 'Native',
    description: 'Russian langue',
    required: true,
  })
  @ValidateIf((object, value) => value !== undefined || value !== '')
  @IsString()
  public russianLangue: string;

  @ApiProperty({
    example: 'I`m FullStack developer...',
    description: 'Position user',
  })
  @IsNotEmpty()
  @IsString()
  public aboutMe: string;

  @ApiProperty({
    example: 'Я FullStack разробник...',
    description: 'Position user',
  })
  @ValidateIf((object, value) => value !== undefined || value !== '')
  @IsString()
  public aboutMe_ua: string;

  @ApiProperty({
    example: 'https://t.me/name',
    description: 'User Telegram contact',
  })
  @ValidateIf((object, value) => value !== undefined || value !== '')
  @Matches(regex.telegramRegex, {
    message: 'Telegram contact must be in the format "https://t.me/name"',
  })
  telegram: string;

  @ApiProperty({
    example: 'https://www.linkedin.com/in/user/',
    description: 'User linkedin url',
    required: true,
  })
  @ValidateIf((object, value) => value !== undefined || value !== '')
  @Matches(regex.linkRegex, {
    message: 'This should have been a link',
  })
  linkedin: string;

  @ApiProperty({
    example: 'https://github.com/user',
    description: 'User gitHub url',
    required: true,
  })
  @ValidateIf((object, value) => value !== undefined || value !== '')
  @IsString()
  @Matches(regex.linkRegex, {
    message: 'This should have been a link',
  })
  public github: string;

  @ApiProperty({
    example: 'https://www.facebook.com/profile.php',
    description: 'User facebook url',
    required: true,
  })
  @ValidateIf((object, value) => value !== undefined || value !== '')
  @Matches(regex.linkRegex, {
    message: 'This should have been a link',
  })
  @IsString()
  public facebook: string;

  @ApiProperty({
    example: 'https://www.instagram.com',
    description: 'User instagram url',
    required: true,
  })
  @ValidateIf((object, value) => value !== undefined || value !== '')
  @Matches(regex.linkRegex, {
    message: 'This should have been a link',
  })
  @IsString()
  public instagram: string;

  @ApiProperty({ example: '+380999999999', description: 'User contact viber' })
  @ValidateIf((object, value) => value !== undefined || value !== '')
  @Matches(regex.phoneRegex, {
    message: 'Contact phone must be in the format "+380999999999"',
  })
  @IsString()
  public viber: string;

  @ApiProperty({
    example: '+380999999999',
    description: 'User contact whatsapp',
  })
  @ValidateIf((object, value) => value !== undefined || value !== '')
  @Matches(regex.phoneRegex, {
    message: 'Contact phone must be in the format "+380999999999"',
  })
  @IsString()
  public whatsapp: string;
}

export class UpdateSampleColorSchemaDto {
  @ApiProperty({
    example: 'default',
    description: 'Color schema site',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  public colorSchema: string;

  @ApiProperty({
    example: 'default',
    description: 'Sample site',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  public sample: string;
}

export class UpdateConsentOfUseDto {
  @ApiProperty({ example: false, description: 'Consent of use' })
  @IsBoolean()
  public consentOfUse: boolean;

  @ApiProperty({
    example:
      'https://my-site.netlify.app?id=a70fdfe5-c1b5-4c1c-b603-b4847358d102',
    description: 'User site url',
    required: true,
  })
  @IsNotEmpty()
  @Matches(regex.linkRegex, {
    message: 'This should have been a link',
  })
  siteResume: string;
}

export class UserResponseDto extends UpdateUserDto {
  @ApiProperty({
    example: '29be42a1-5318-4535-bd85-f7e34cc03acb',
    description: 'User id',
  })
  public id: string;

  @ApiProperty({ example: false, description: 'User agreement' })
  public userAgreement: boolean;

  @ApiProperty({ example: false, description: 'Consent of use' })
  public consentOfUse: boolean;

  @ApiProperty({ type: [WorkDto] })
  works: WorkDto;

  @ApiProperty({ type: [EducationDto] })
  educations: EducationDto;

  @ApiProperty({ type: [ProjectDto] })
  projects: ProjectDto;
}
export class ResponseDto {
  @ApiProperty({
    example: 'FGfchJHGfkJGC_kgjkvKGCKJc.HVKUyfkj...',
    description: 'accessToken',
  })
  accessToken: string;

  @ApiProperty({
    example: 'FGfchJHGfkJGC_kgjkvKGCKJc.HVKUyfkj...',
    description: 'refreshToken',
  })
  refreshToken: string;

  @ApiProperty({ type: UserResponseDto })
  user: UserResponseDto;
}
