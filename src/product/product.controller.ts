import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  HttpStatus,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('/create')
  async createProduct(@Res() res, @Body() createProductDTO: CreateProductDTO) {
    const productCreado = await this.productService.createdProduct(
      createProductDTO,
    );
    return res.status(HttpStatus.CREATED).json({
      productCreado,
    });
  }

  @Get('/')
  async getAllProducts(@Res() res) {
    const products = await this.productService.getProducts();
    return res.status(HttpStatus.OK).json(products);
  }

  @Get('/:id')
  async getProductById(@Res() res, @Param('id') productID) {
    const product = await this.productService.getProduct(productID);
    if (!product)
      throw new NotFoundException(`Producto con id: ${productID} NO EXISTE!!`);
    return res.status(HttpStatus.OK).json(product);
  }

  @Put('/:id')
  async updateProductById(
    @Res() res,
    @Param('id') productID,
    @Body() createProductDTO: CreateProductDTO,
  ) {
    const updateProduct = await this.productService.updateProduct(
      productID,
      createProductDTO,
    );
    if (!updateProduct) {
      throw new NotFoundException(
        `Product with id: ${productID} does not exist`,
      );
    }
    res.status(HttpStatus.ACCEPTED).json({
      message: 'Product Updated',
      updateProduct,
    });
  }

  @Delete('/:id')
  async deleteProductById(@Res() res, @Param('id') productID) {
    const deleteProduct = await this.productService.deleteProduct(productID);

    if (!deleteProduct) {
      throw new NotFoundException(`Product with Id: ${productID} Not Found`);
    }

    res.status(HttpStatus.ACCEPTED).json({
      message: 'PRODUCTO ELIMINADO',
      deleteProduct,
    });
  }
}
