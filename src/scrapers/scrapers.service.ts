import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ScrapersService {
  async findAll(link: string, numberPage?: number) {
    const response = await axios.get(`${link}?page=${numberPage}`);
    return response;
  }
}
