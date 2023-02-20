import './DashboardCatalog.scss';
import React, { useEffect, useMemo, useState } from 'react'
import { Col, Form, FormGroup } from 'reactstrap';
import { useSelector as useReduxSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { ProductItem } from '../../../types/ProductItem';
import { addProduct, deleteProduct, updateProduct, updateProductActiveStatus, uploadPhoto } from '../../../helpers/firebase/firebaseHelper';
import { Avatar, Checkbox, LoadingSpinner, MotionButton, ProductList } from '../../../components';
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
    const isAnAdmin = user.account === "Admin";

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
    const [form, setForm] = useState({...initialState, editing: false});




    // const [newProductActive, setNewProductActive] = useState<boolean>(true)
    // const [addingNewProduct, setAddingNewProduct] = useState<boolean>();
    // const [editingProduct, setEditingProduct] = useState<boolean>();
    // const [selectedCategory, setSelectedCategory] = useState<Category>("Courses");
    // const [selectedServiceCategory, setSelectedServiceCategory] = useState<ServiceCategory>("NA");
    const [selectImage, setSelectImage] = useState<File | null>(null)

    const folder = form.category.toLowerCase();
    const { data, loadingData, dataError } = useFirestoreData(folder);
    const [productOnSale, setProductOnSale] = useState<boolean>(false)






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

    const handleProductImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
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
            listing?.map((item, key) => (
                <tr key={key}>
                    <td>#{key + 1}</td>
                    <td>
                        {/* <Checkbox label='' isSelected={item.active} onChange={checked => handleActiveChange(checked, item)} /> */}
                        <MotionButton className='dash__action-button' onClick={() => handleActiveChange(!item.active, item)}>
                            {item.active ? "Disable" : "Enable"}
                        </MotionButton>
                    </td>
                    <td className='d-flex flex-row gap-2'>
                        <Avatar url={item.imgUrl} scale="2.5rem" borderRadius='10px' />


                        {/* <input type="file" id="file" accept="image/*" onChange={() => {
                            alert("onChange:: " + " - key: " + key);
                         }} /> */}

                        {/* <UploadInput
                            // className=''
                            accept="image/*"
                            onChange={() => {
                                alert("onChange:: " + " - key: " + key);
                                // handleProductImageChange
                            }}
                        >
                            Change
                        </UploadInput> */}



                    </td>
                    <td>{item.title}</td>
                    {form.category === "Services" &&
                        <td>
                            {item.subServiceCategory}
                            {/* <select
                                placeholder="Blue"
                                name="category"
                                value={item.subServiceCategory}
                            >
                                <option value="Eyelash Extensions Full Sets">Eyelash Extensions Full Sets</option>
                                <option value="Eyelash Extensions Infills">Eyelash Extensions Infills</option>
                                <option value="Eyebrows">Eyebrows</option>
                                <option value="Lips">Lips</option>
                                <option value="Semi-Permanent Makeup">Semi-Permanent Makeup</option>
                            </select> */}
                        </td>
                    }
                    <td>{formatCurrency(item.price)}</td>
                    {/* <td>
                        <MotionButton className='dash__action-button' onClick={() => { }}>Edit</MotionButton>
                    </td> */}
                    <td className='d-flex gap-2'>
                        {isAnAdmin &&
                            <MotionButton className='dash__action-button' onClick={() => setForm({ ...item, editing: true })}>
                                <Icon_Pencil className='text-white' />
                            </MotionButton>
                        }

                        <MotionButton className='dash__action-button'>
                            <Icon_Email className='text-white' />
                        </MotionButton>

                        <MotionButton className='dash__action-button' onClick={() => handleProductRemove(item.id)}>
                            <Icon_Trash className='text-white' />
                        </MotionButton>
                    </td>
                </tr>
            ))
        )
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (files && files?.length > 0) {
            setSelectImage(files[0])
        }
    }

    const handleFormSubmit = (e: React.FormEvent<EventTarget | HTMLFormElement>) => {
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
        <SectionContainerWrapper>
            <Col lg='12' className='dash__catalog__menu'>
                <div className='d-flex gap-2'>
                    <MotionButton className={`tab ${selectedTab === "Courses" ? "tab-selected" : ""}`} onClick={() => {
                        setSelectedTab("Courses")
                        setForm({ ...form, category: "Courses" })
                    }}>Courses</MotionButton>
                    <MotionButton className={`tab ${selectedTab === "Services" ? "tab-selected" : ""}`} onClick={() => {
                        setSelectedTab("Services")
                        setForm({ ...form, category: "Services" })
                    }}>Services</MotionButton>
                </div>

                {form.editing ? <h4 className='fw-bold'>Add A New {selectedTab.slice(0, -1)}</h4> : null}

                <div className='d-flex gap-2'>
                    {/* <MotionButton onClick={() => setForm(initialState)}>
                        {!form.title ? <Icon_Plus className='text-white' /> : "Done"}
                    </MotionButton> */}

                    {/* {!editingProduct ?
                        <MotionButton onClick={() => {
                            setAddingNewProduct(prev => prev = !prev)}
                        }>
                            {!form.title ? <Icon_Plus className='text-white' /> : "Done"}
                        </MotionButton>
                        :
                        <MotionButton onClick={() => setEditingProduct(prev => prev = !prev)}>
                            Done
                        </MotionButton>
                    } */}
                    {/* {!addingNewProduct ? <MotionButton>Clear All</MotionButton> : null} */}


                    <MotionButton onClick={() => {
                        // setForm(prev => {...prev, editing: !prev.editing })
                        setForm({...initialState, editing: !form.editing})
                    }}>
                        {!form.editing ? <Icon_Plus className='text-white' /> : "Done"}
                    </MotionButton>
                </div>
            </Col>

            {form.editing ?
                <Col lg='12' className=''>
                    <Form className='catalog__form mt-1' onSubmit={handleFormSubmit}>
                        {/* <FormGroup className="form__group">
                                    <Checkbox label='Active' isSelected={newProductActive} onChange={checked => setNewProductActive(checked)} />
                                </FormGroup> */}

                        <FormGroup className="form__group">
                            <input name="title" type="text" placeholder='Enter Title' value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                        </FormGroup>

                        <FormGroup className="form__group">
                            <input name="price" type="number" placeholder='Enter Price' value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
                        </FormGroup>

                        <FormGroup className="form__group">
                            <Checkbox label='Is On Sale' onChange={(value) => setForm({ ...form, isOnSale: value })} />
                        </FormGroup>

                        {productOnSale ?
                            <FormGroup className="form__group">
                                <input name="salePrice" type="number" placeholder='Enter Sale Price' value={form.salePrice} onChange={(e) => setForm({ ...form, salePrice: Number(e.target.value) })} />
                            </FormGroup>
                            : null
                        }

                        <FormGroup className="form__group">
                            <input name="shortDesc" type="text" placeholder='Enter A Short Decription' value={form.shortDesc} onChange={(e) => setForm({ ...form, shortDesc: e.target.value })} />
                        </FormGroup>

                        <FormGroup className="form__group">
                            <input name="description" type="text" placeholder='Enter A Decription' value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                        </FormGroup>

                        {form.category === "Services" ?
                            <FormGroup className="form__group">
                                <label htmlFor="">Service Category&nbsp;</label>
                                <select onChange={e => {
                                    let category: ServiceCategory = e.target.value as ServiceCategory;
                                    setForm({ ...form, subServiceCategory: category })
                                }}>
                                    <option value='N/A'>N/A</option>
                                    <option value='Eyelash Extensions Full Sets'>Eyelash Extensions Full Sets</option>
                                    <option value='Eyelash Extensions Infills'>Eyelash Extensions Infills</option>
                                    <option value='Eyebrows'>Eyebrows</option>
                                    <option value='Lips'>Lips</option>
                                    <option value='Semi-Permanent Makeup'>Semi-Permanent Makeup</option>
                                </select>
                            </FormGroup>
                            : null}

                        <FormGroup className="form__group">
                            <input name="duration" type="number" placeholder='Enter Duration' value={form.duration} onChange={(e) => setForm({ ...form, duration: Number(e.target.value) })} />
                        </FormGroup>

                        <FormGroup className="form__group">
                            <input name="upcomingDates" type="text" placeholder='Enter Upcoming Dates' value={form.upcomingDates} />
                        </FormGroup>

                        <FormGroup className="form__group">
                            <UploadInput className='new-product__photo-picker' accept="image/*" onChange={handleFileChange}>
                                Upload Photo
                            </UploadInput>
                        </FormGroup>

                        <FormGroup className="form__group">
                            <MotionButton type='submit' disabled={form.title === "" && form.price == 0}>
                                {form.id ? "Update" : "Add New Product"}
                            </MotionButton>
                        </FormGroup>
                    </Form>
                </Col>
                :
                <Col lg='12' className='mt-4'>
                    <h4 className='fw-bold'>All {selectedTab} ({listing?.length})</h4>

                    <table className='table mt-3'>
                        <thead>
                            <tr className=''>
                                <th>#</th>
                                <th>Active</th>
                                <th>Image</th>
                                <th>Title</th>
                                {form.category === "Services" && <th>Category</th>}
                                <th>Price</th>
                                {/* <th>Edit</th> */}
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
            }
        </SectionContainerWrapper>
    )
}

export default DashboardCatalog