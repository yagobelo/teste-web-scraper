import { Body, Controller, Get, NotFoundException } from '@nestjs/common';
import { ScrapersService } from './scrapers.service';
import * as cheerio from 'cheerio';
import { GetAllScraperDto } from './dto/getAll-scrapers.dto';

@Controller('scrapers')
export class ScrapersController {
  constructor(private readonly scrapersService: ScrapersService) {}

  @Get()
  async findAll(@Body() getAllScraperDto: GetAllScraperDto) {
    // eslint-disable-next-line prefer-const
    const { link } = getAllScraperDto;
    let response: any = await this.scrapersService.findAll(link);
    const html = response.data;
    const $ = cheerio.load(html);
    if ($('.product-wrapper').length <= 1) {
      throw new NotFoundException(`Product in page not found.`);
    }

    let existNextPage: boolean = true;
    let countPage: number = 1;

    const laptopsLenovo = [];

    const scraperData = () => {
      const html = response.data;
      const $ = cheerio.load(html);

      $('.product-wrapper').each((index, element) => {
        const title = $(element).find('.title').text().trim();
        const price = $(element)
          .find('.price.float-end.card-title.pull-right')
          .text()
          .trim();
        const description = $(element)
          .find('.description.card-text')
          .text()
          .trim();
        const img = $(element)
          .find('.img-fluid.card-img-top.image.img-responsive')
          .attr('src');
        const reviewsCount = $(element)
          .find('.review-count.float-end')
          .text()
          .trim();
        const ratings = $(element).find('p:eq(2) span').length;
        const linkProduct = $(element).find('.title').attr('href');

        const laptop = {
          title,
          price,
          description,
          img,
          reviewsCount,
          ratings,
          linkProduct,
        };

        if (title.split(' ')[0].toUpperCase() === 'LENOVO') {
          laptopsLenovo.push(laptop);
        }
      });
    };

    while (existNextPage) {
      scraperData();

      countPage++;
      response = await this.scrapersService.findAll(link, countPage);
      const html = response.data;
      const $ = cheerio.load(html);

      if ($('.product-wrapper').length <= 1) {
        existNextPage = false;
      }
    }

    const laptopsLenovoOrderByPrice = laptopsLenovo.sort((a, b) => {
      const priceA = parseFloat(a.price.replace('$', ''));
      const priceB = parseFloat(b.price.replace('$', ''));

      return priceA - priceB;
    });
    return laptopsLenovoOrderByPrice;
  }
}
