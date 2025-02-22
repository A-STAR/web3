import React from 'react';
import { type ChangeEvent, type FormEvent, useEffect, useState } from 'react';
import { type Address, Web3 } from 'web3';

function TransferForm({ address, web3 }: { address: Address; web3: Web3 }) {
	// form state
	const [isFormValid, setIsFormValid] = useState<boolean>(false);
	const [transferTo, setTransferTo] = useState<string>('');
	const [transferAmount, setTransferAmount] = useState<string>('');

	// https://www.geeksforgeeks.org/ethereum-address-validation-using-regular-expressions/
	function isValidAddress(address: string): boolean {
		return /^(0x)?[0-9a-fA-F]{40}$/.test(address);
	}

	// form validator
	useEffect(() => {
		const amount = parseFloat(transferAmount);
		setIsFormValid(isValidAddress(transferTo) && !isNaN(amount) && amount > 0);
	}, [transferTo, transferAmount]);

	// form change handler
	function transferFormChange(e: ChangeEvent<HTMLInputElement>): void {
		const { name, value } = e.target;

		if (name === 'to') {
			setTransferTo(value);
		} else if (name === 'amount') {
			setTransferAmount(value);
		}
	}

	// submit form handler
	function transfer(e: FormEvent<HTMLFormElement>): void {
		// prevent default form submission behavior
		e.preventDefault();

		if (web3 === undefined) {
			return;
		}

		// parse form data
		const formData: FormData = new FormData(e.currentTarget);

		// validate "to" field
		const to: FormDataEntryValue | null = formData.get('to');
		if (to === null || !isValidAddress(to as string)) {
			return;
		}

		// check if "amount" field is empty
		const amount: FormDataEntryValue | null = formData.get('amount');
		if (amount === null) {
			return;
		}

		// validate "amount" field
		const value: number = parseFloat(amount as string);
		if (isNaN(value) || value <= 0) {
			return;
		}

		// reset form
		setTransferTo('');
		setTransferAmount('');

		// send transaction
		web3.eth.sendTransaction({
			from: address,
			to: to as string,
			value: web3.utils.toWei(value, 'ether'),
		});
	}

	return (
		<form onSubmit={transfer}>
			<label>
				Transfer to:{' '}
				<input value={transferTo} onChange={transferFormChange} name="to" type="text" />
			</label>

			<span style={{ paddingRight: '5px' }}></span>

			<label>
				Transfer amount in ether:{' '}
				<input
					value={transferAmount === undefined ? '' : transferAmount.toString()}
					onChange={transferFormChange}
					name="amount"
					type="number"
				/>
			</label>

			<span style={{ paddingRight: '5px' }}></span>

			<button type="submit" disabled={!isFormValid}>
				Transfer
			</button>
		</form>
	);
}

export default TransferForm;