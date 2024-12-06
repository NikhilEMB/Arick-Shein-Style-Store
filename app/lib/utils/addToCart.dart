import 'package:shein/providers/cartProvider.dart';
import 'package:provider/provider.dart';

class CartService {
  addToCartFromLocalStorage({context, cartData}) async {
    Provider.of<Cart>(context, listen: false)
        .addToCartFromLocalStorage(cartData);
  }

  addToCart({context, product, priceListIndex, productId}) async {
    await Provider.of<Cart>(context, listen: false).addToCart(
        priceListIndex: priceListIndex,
        product: product,
        quantity: 1,
        productId: productId);
  }
}
