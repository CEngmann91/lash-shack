import './DashboardCatalog.scss';
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react'
import { Col, Form, FormGroup } from 'reactstrap';
import { useSelector as useReduxSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { ProductItem } from '../../../types/ProductItem';
import { addProduct, deleteProduct, updateProduct, updateProductActiveStatus, uploadPhoto } from '../../../firebase/firebaseHelper';
import { ArrowMotionButton, Avatar, Checkbox, Form_RadioOptionGroup, LoadingSpinner, MotionButton, ProductList } from '../../../components';
import useFirestoreData from '../../../hooks/useFirestoreData';
import UploadInput from '../../../components/Form/UploadInput/UploadInput';
import { Category } from '../../../types/Category';
import { ServiceCategory } from '../../../types/ServiceCategory';
import { useNavigate } from 'react-router-dom';
import { Icon_Email, Icon_Pencil, Icon_Plus, Icon_Trash } from '../../../res/icons';
import { formatCurrency } from '../../../res/funcs';
import SectionContainerWrapper from '../../../components/SectionContainerWrapper/SectionContainerWrapper';

const DashboardCatalog = () => {
    const navigate = useNavigate();
    const user = useReduxSelector((state: RootState) => state.userAccount.user);
    const isAnAdmin = user.account === "Manager";

    type Tab = "Courses" | "Services";
    const [selectedTab, setSelectedTab] = useState<Tab>("Courses");

    const initialState: ProductItem = {
        id: '',
        active: false,
        imgUrl: '',
        title: '',
        category: 'Courses',
        subServiceCategory: 'NA',
        price: 0,
        isOnSale: false,
        salePrice: 0,
        shortDesc: '',
        description: '',
        duration: 0,
        reviews: [],
        upcomingDates: []
    };
    const [form, setForm] = useState({
        ...initialState,
        selectedProductIndex: 0,
        addingNewProduct: false,
        editingProduct: false,
        specialDates: false
    });
    const [selectImage, setSelectImage] = useState<File | null>(null)

    const folder = form.category.toLowerCase();
    const { data, loadingData, error } = useFirestoreData(folder);






    const listing = useMemo(() => {
        let sortedData;
        if (form.category === "Courses")
            sortedData = data?.sort((a, b) => b.price - a.price);
        if (form.category === "Services")
            sortedData = data?.sort((a, b) => a.subServiceCategory.toString().localeCompare(b.subServiceCategory.toString()));

        // const sortedData = data?.sort((a, b) => a.catgory.localeCompare(b.catgory.toString()));
        // data as ProductItem[]
        return sortedData as ProductItem[];
    }, [data, folder]);

    const handleProductImageChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const files = e.target.files;
        if (files && files?.length > 0) {
            const product: ProductItem = listing[index];

            // alert(product.id + " - " + index);
            updateProductPhoto(product, folder, files[0])
        }
    }

    const handleProductRemove = async (id: string) => {
        await deleteProduct(folder, id);
    }

    const handleActiveChange = async (checked: boolean, product: ProductItem) => {
        await updateProductActiveStatus(folder, product, checked);
    }

    const renderListData = () => {

        return (
            listing?.map((item, key) => {
                const { id, active, title, price, imgUrl, subServiceCategory, upcomingDates, } = item;

                return (
                    <tr key={key}>
                        {/* <td>#{key + 1}</td> */}
                        <td>
                            {/* <Checkbox label='' isSelected={item.active} onChange={checked => handleActiveChange(checked, item)} /> */}
                            <MotionButton className='dash__action-button' onClick={() => handleActiveChange(!active, item)}>
                                {active ? "Disable" : "Enable"}
                            </MotionButton>
                        </td>
                        <td className='d-flex flex-row gap-2'>
                            <Avatar url={imgUrl} scale="2.5rem" borderRadius='10px' />
                        </td>
                        <td>{title}</td>
                        <td>{formatCurrency(price)}</td>
                        <td className='d-flex gap-2'>
                            {isAnAdmin &&
                                <MotionButton className='dash__action-button' onClick={() => setForm({ ...item, editingProduct: true, addingNewProduct: false, specialDates: upcomingDates?.length > 0, selectedProductIndex: key })}>
                                    <Icon_Pencil className='text-white' />
                                </MotionButton>
                            }

                            <MotionButton className='dash__action-button'>
                                <Icon_Email className='text-white' />
                            </MotionButton>

                            <MotionButton className='dash__action-button' onClick={() => handleProductRemove(id)}>
                                <Icon_Trash className='text-white' />
                            </MotionButton>
                        </td>
                    </tr>
                )
            })
        )
    }

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (files && files?.length > 0) {

            const element = document.getElementById("product-preview") as HTMLImageElement;
            element.src = window.URL.createObjectURL(files[0])
            setSelectImage(files[0])
        }
    }

    const handleFormSubmit = (e: FormEvent<EventTarget | HTMLFormElement>) => {
        e.preventDefault();


        // Removes the last character in category, lowercase then remove and any whitespaces from the title.
        const newID = `${folder.slice(0, -1)}__${form.title.replace(/\s/g, "")}`;


        setForm({
            ...form,
            id: newID,
        })

        // if (selectImage)
        //     uploadNewProduct(form, folder, selectImage);
        console.log(form);







        /*const target = e.target as typeof e.target & {
            // name property has to match
            title: { value: string };
            price: { value: string };
            salePrice: { value: string };
            shortDesc: { value: string };
            description: { value: string };
            duration: { value: string };
            upcomingDates: { value: string };
        };
        const title = target.title.value; // typechecks!
        const price = Number(target.price.value); // typechecks!
        const salePrice = Number(target.salePrice.value); // typechecks!
        const shortDesc = target.shortDesc.value;       // typechecks!
        const description = target.description.value; // typechecks!
        const duration = Number(target.duration.value); // typechecks!
        const upcomingDates = target.upcomingDates.value; // typechecks!

        if (!title || !price || !shortDesc || !description) {
            alert("Missing field");
            return;
        }

        // const folder = selectedCategory.toLowerCase();
        // Removes the last character in category, lowercase then remove and any whitespaces from the title.
        const newID = `${folder.slice(0, -1)}__${title.replace(/\s/g, "")}`;
        const newProductItem: ProductItem = {
            id: newID,
            active: true,
            imgUrl: "",
            title: title,
            category: selectedCategory,
            subServiceCategory: selectedServiceCategory,
            price: price,
            isOnSale: productOnSale,
            salePrice: salePrice,
            shortDesc: shortDesc,
            description: description,
            duration: duration,
            reviews: [],
            upcomingDates: upcomingDates.split(',')
        }

        setForm(initialState)
        if (selectImage)
            uploadNewProduct(newProductItem, folder, selectImage);
        */
    }

    const updateProductPhoto = async (productItem: ProductItem, folder: string, photoFile: File) => {
        try {
            await uploadPhoto(photoFile, folder, productItem.id,
                (state, progress) => {
                    // console.log('state', state, "progress", progress);
                },
                async (url) => {
                    productItem.imgUrl = url;
                    // console.log('url', url);

                    await updateProduct(folder, productItem)
                }
            );
        } catch (error) {
            console.log(error);
        }
    }

    const uploadNewProduct = async (newProductItem: ProductItem, folder: string, photoFile: File) => {
        try {
            await uploadPhoto(photoFile, folder, newProductItem.id,
                (state, progress) => {
                    // console.log('state', state, "progress", progress);
                },
                async (url) => {
                    newProductItem.imgUrl = url;
                    // console.log('url', url);

                    await addProduct(folder, newProductItem)
                    // setNewProductActive(true);
                }
            );
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <SectionContainerWrapper className='dashboard_catalog__section'>
            <Col lg='12' className='dash__catalog__menu'>
                {!form.editingProduct && !form.addingNewProduct ?
                    <>
                        <Form_RadioOptionGroup value={selectedTab == "Courses" ? 0 : 1} options={["Courses", "Services"]} onChange={(value) => {
                            const tab = (value == 0 ? "Courses" : "Services");
                            setSelectedTab(tab)
                            setForm({ ...form, category: tab})
                        }} />

                        <ArrowMotionButton className='green-button' onClick={() => setForm({ ...form, addingNewProduct: true })}>
                            Add Product
                        </ArrowMotionButton>
                    </>
                    :
                    <>
                        <div />
                        <MotionButton onClick={() => setForm({ ...initialState, editingProduct: false, addingNewProduct: false, specialDates: false, selectedProductIndex: 0 })}>Cancel</MotionButton>
                    </>
                }
            </Col>







            {!form.editingProduct && !form.addingNewProduct ?
                <Col lg='12' className='mt-2'>
                    {/* <h4 className='fw-bold'>All {selectedTab} ({listing?.length})</h4> */}

                    <table className='table'>
                        <thead>
                            <tr className=''>
                                <th>Active</th>
                                <th>Image</th>
                                <th>Title</th>
                                {form.category === "Services" && <th>Category</th>}
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                loadingData ? <LoadingSpinner title="Loading Catalog" /> : renderListData()
                            }
                        </tbody>
                    </table>
                </Col>
                :
                <Col lg='12' className='mt-4'>
                    <h1 className='text-center'>Product Information</h1>

                    <Form className='catalog__form mt-3 gap-4'>
                        <div className='d-flex flex-row gap-4'>
                            <FormGroup className="form__group d-flex flex-column w-100">
                                <label className='fw-bold'>Product Name</label>
                                <input className=''
                                    name="productName"
                                    type="text"
                                    placeholder='Enter Product Name'
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                />
                            </FormGroup>


                            <FormGroup className="form__group d-flex flex-column w-100">
                                <label className='fw-bold'>Product Price</label>
                                <input className=''
                                    name="productPrice"
                                    type="text"
                                    placeholder='Enter Price'
                                    value={Number(form.price)}
                                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                                />
                            </FormGroup>
                        </div>

                        <FormGroup className="form__group d-flex flex-column w-100">
                            <label className='fw-bold'>Product Short Description</label>
                            <input className=''
                                name="productShortDescription"
                                type="text"
                                placeholder='Enter A Short Description'
                                value={form.shortDesc}
                                onChange={(e) => setForm({ ...form, shortDesc: e.target.value })}
                            />
                        </FormGroup>


                        {form.addingNewProduct ?
                            <FormGroup className="form__group d-flex flex-column w-100">
                                <label className='fw-bold'>Category</label>
                                <select onChange={e => {
                                    let category: Category = e.target.value as Category;
                                    if (category === "Courses")
                                        setForm({ ...form, category, subServiceCategory: "NA" })
                                    else
                                        setForm({ ...form, category })
                                }}>
                                    <option value='Course'>Course</option>
                                    <option value='Services'>Services</option>
                                </select>


                                {form.category === "Services" ?
                                    <FormGroup className="form__group d-flex flex-column w-100 p-2">
                                        <label className='fw-bold'>Type</label>
                                        <select onChange={e => {
                                            let sub: ServiceCategory = e.target.value as ServiceCategory;
                                            setForm({ ...form, subServiceCategory: sub })
                                        }}>
                                            <option value='Eyelash Extensions Full Sets'>Eyelash Extensions Full Sets</option>
                                            <option value='Eyelash Extensions Infills'>Eyelash Extensions Infills</option>
                                            <option value='Eyebrows'>Eyebrows</option>
                                            <option value='Lips'>Lips</option>
                                            <option value='Semi-Permanent Makeup'>Semi-Permanent Makeup</option>
                                        </select>
                                    </FormGroup>
                                    : null}
                            </FormGroup>
                            :
                            <FormGroup className="form__group d-flex flex-column w-100">
                                {selectedTab === "Services" ?
                                    <FormGroup className="form__group d-flex flex-column w-100 p-2">
                                        <label className='fw-bold'>Type</label>
                                        <select onChange={e => {
                                            let sub: ServiceCategory = e.target.value as ServiceCategory;
                                            setForm({ ...form, subServiceCategory: sub })
                                        }}>
                                            <option value='Eyelash Extensions Full Sets'>Eyelash Extensions Full Sets</option>
                                            <option value='Eyelash Extensions Infills'>Eyelash Extensions Infills</option>
                                            <option value='Eyebrows'>Eyebrows</option>
                                            <option value='Lips'>Lips</option>
                                            <option value='Semi-Permanent Makeup'>Semi-Permanent Makeup</option>
                                        </select>
                                    </FormGroup>
                                    : null}
                            </FormGroup>
                        }


                        <FormGroup className="form__group d-flex flex-column w-100">
                            <label className='fw-bold'>Product Full Description</label>
                            <textarea required
                                rows={4}
                                name="description"
                                placeholder='Enter Full Product description'
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                            />
                        </FormGroup>

                        <FormGroup className="form__group">
                            <Checkbox label='Is On Sale'
                                isSelected={form.isOnSale}
                                onChange={(value) => setForm({ ...form, isOnSale: value })}
                            />
                        </FormGroup>

                        {form.isOnSale &&
                            <FormGroup className="form__group d-flex flex-column w-100">
                                <label className='fw-bold'>Product Sale Price</label>
                                <input className=''
                                    name="productSalePrice"
                                    type="text"
                                    placeholder='Enter Sale Price'
                                    value={Number(form.salePrice)}
                                    onChange={(e) => setForm({ ...form, salePrice: Number(e.target.value) })}
                                />
                            </FormGroup>
                        }

                        <FormGroup className="form__group">
                            <Checkbox label='Special Upcoming Dates'
                                isSelected={form.specialDates}
                                onChange={(value) => setForm({ ...form, specialDates: value })}
                            />
                        </FormGroup>

                        {form.specialDates &&
                            <FormGroup className="form__group d-flex flex-column w-100">
                                <input className=''
                                    name="specialUpcomingDates"
                                    type="text"
                                    placeholder='Enter Upcoming Dates'
                                    value={form.upcomingDates?.join(",")}
                                    onChange={(e) => setForm({ ...form, upcomingDates: e.target.value.split(",") })}
                                />
                            </FormGroup>
                        }

                        <FormGroup className="form__group">
                            <UploadInput className='new-product__photo-picker' accept="image/*" onChange={handleFileChange}>
                                Upload Photo
                            </UploadInput>
                        </FormGroup>

                        <FormGroup className="form__group product-previewImage d-flex">
                            <img id="product-preview" alt="your product image" />
                        </FormGroup>

                        {form.editingProduct &&
                            <FormGroup className="form__group d-flex w-100">
                                <ArrowMotionButton className='' onClick={() => {
                                    setForm({ ...form, addingNewProduct: false, editingProduct: false })
                                }}>
                                    Update Product
                                </ArrowMotionButton>
                            </FormGroup>
                        }
                        {form.addingNewProduct &&
                            <FormGroup className="form__group d-flex w-100">
                                <ArrowMotionButton className='' onClick={() => {
                                    setForm({ ...form, addingNewProduct: false, editingProduct: false })
                                }}>
                                    Create Product
                                </ArrowMotionButton>
                            </FormGroup>
                        }
                    </Form>
                </Col>
            }
        </SectionContainerWrapper>
    )
}

export default DashboardCatalog