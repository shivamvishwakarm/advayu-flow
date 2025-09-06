import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface OutletData {
  name: string;
  address: string;
  latitude?: number;
  longitude?: number;
  posProvider: string;
  posOutletId: string;
  menuFile?: File;
  managerName: string;
  managerPhone: string;
  managerEmail: string;
}

export interface FormData {
  // Brand Information
  brandName: string;
  logoFile?: File;
  brandCategory: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  
  // Outlets
  outlets: OutletData[];
  
  // Compliance Documents
  gstin: string;
  fssai: string;
  pan: string;
  
  // Banking Details
  accountNumber: string;
  ifscCode: string;
  upiId: string;
  cancelledCheque?: File;
  
  // Consent
  posBillsPermission: boolean;
  discountPermission: boolean;
  qrDisplayPermission: boolean;
  termsAgreed: boolean;
}

interface FormState {
  currentStep: number;
  formData: FormData;
  completedSteps: number[];
}

const initialFormData: FormData = {
  brandName: '',
  brandCategory: '',
  contactName: '',
  contactPhone: '',
  contactEmail: '',
  outlets: [
    {
      name: '',
      address: '',
      posProvider: '',
      posOutletId: '',
      managerName: '',
      managerPhone: '',
      managerEmail: '',
    }
  ],
  gstin: '',
  fssai: '',
  pan: '',
  accountNumber: '',
  ifscCode: '',
  upiId: '',
  posBillsPermission: false,
  discountPermission: false,
  qrDisplayPermission: false,
  termsAgreed: false,
};

const initialState: FormState = {
  currentStep: 0,
  formData: initialFormData,
  completedSteps: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    updateFormData: (state, action: PayloadAction<Partial<FormData>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    addCompletedStep: (state, action: PayloadAction<number>) => {
      if (!state.completedSteps.includes(action.payload)) {
        state.completedSteps.push(action.payload);
      }
    },
    addOutlet: (state) => {
      state.formData.outlets.push({
        name: '',
        address: '',
        posProvider: '',
        posOutletId: '',
        managerName: '',
        managerPhone: '',
        managerEmail: '',
      });
    },
    removeOutlet: (state, action: PayloadAction<number>) => {
      if (state.formData.outlets.length > 1) {
        state.formData.outlets.splice(action.payload, 1);
      }
    },
    updateOutlet: (state, action: PayloadAction<{ index: number; data: Partial<OutletData> }>) => {
      const { index, data } = action.payload;
      if (state.formData.outlets[index]) {
        state.formData.outlets[index] = { ...state.formData.outlets[index], ...data };
      }
    },
  },
});

export const {
  setCurrentStep,
  updateFormData,
  addCompletedStep,
  addOutlet,
  removeOutlet,
  updateOutlet,
} = formSlice.actions;

export const store = configureStore({
  reducer: {
    form: formSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['form/updateFormData'],
        ignoredPaths: ['form.formData.logoFile', 'form.formData.cancelledCheque', 'form.formData.outlets.0.menuFile'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;