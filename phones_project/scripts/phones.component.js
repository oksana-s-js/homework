import {PhonesCatalogComponent} from "./phones-catalog/phones-catalog.component.js";
import {BaseComponent} from "./shared/component/base/base.component.js";
import {PhonesService} from "./phones.service.js";
import {PhoneDetailsComponent} from "./phone-details/phone-details.component.js";
import {CartComponent} from "./cart/cart.component.js";

export class PhonesPageComponent extends BaseComponent {

    constructor({element}) {
        super({element});
        this._render();
        
        const catalogPhones = PhonesService.getAll();
        this._initCatalog(catalogPhones);

        this._initPhoneDetails();
        this._initCart();

        this
            .on('change', '.sort-select', ({ delegateTarget: { value }}) => {
                switch (value) {
                    case 'name':
                        catalogPhones.sort(this._byField('name'));
                        break;
                
                    case 'age':
                        catalogPhones.sort(this._byField('age'));
                        break;
                }
                
                this._initCatalog(catalogPhones);
            })
            .on('input', '.filter', ({ delegateTarget: { value }}) => {
                const filterFunction = this._phonesFilter(value, catalogPhones);
                this._throttle(filterFunction, 400);
            });
    }

    _initCatalog(phones) {
        this._catalog = new PhonesCatalogComponent({
            element: this._element.querySelector('.phones-catalog'),
            phones: phones
        });

        this._catalog
            .subscribe('phone-selected', ({ detail }) => {
                this._catalog.hide();
                this._phoneDetails.show(PhonesService.getOneById(detail));
            })
            .subscribe('add-to-cart', ({ detail }) => {
                this._cart.add(detail);
            });

    }

    _initPhoneDetails() {
        this._phoneDetails = new PhoneDetailsComponent({
            element: this._element.querySelector('.phone-details'),
        });

        this._phoneDetails
            .subscribe('back', ({}) => {
                this._catalog.show();
                this._phoneDetails.hide();
            })
            .subscribe('add-phone', ({detail}) => {
                this._cart.add(detail);
            })
    }

    _initCart() {
        this._cart = new CartComponent({
            element: this._element.querySelector('.cart'),
        })
    }

    _render() {
        this._element.innerHTML = ` 
        <div class="row">

            <!--Sidebar-->
            <div class="col-md-2">
                <section>
                    <p>Search:
                        <input class="filter" type="text">
                    </p>

                    <p>Sort by:
                        <select class="sort-select">
                            <option value="name">Alphabetical</option>
                            <option value="age" selected="selected">Newest</option>
                        </select>
                    </p>
                </section>

                <section class="cart"></section>
            </div>

            <!--Main content-->
            <div class="col-md-10 phones-catalog"> </div>
            <div class="col-md-10 phone-details"> </div>
        </div>`
    }

    // сортировка по полю
    _byField(fieldName) {
        return (curr, next) => curr[fieldName] > next[fieldName] ? 1 : -1;
    }

    // фильтр телефонов
    _phonesFilter(query, phones) {
        let filteredPhones = [];

        filteredPhones = phones.filter(phone => {
            return phone.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
        });

        this._initCatalog(filteredPhones);
    }

    // throttle декоратор
    _throttle(fn, ms) {
        let isBusy = false;
        let lastArgs;
        return function worker(...args) {
            if (isBusy) {
                lastArgs = args;
                return;
            }
            isBusy = true;
            lastArgs = null;
            setTimeout(() => {
                isBusy = false;
                if (!lastArgs) {
                    return;
                }
                worker.call(this, ...lastArgs);
            }, ms);

            return fn.call(this, ...args);
        };
    }
    
}
